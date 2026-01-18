import { Router } from "express";
import { z } from "zod";
import { BookingRepository } from "../repositories/booking.repository";
import { BookingService } from "../services/booking.service";


export const bookingRouter = Router();


const repo = new BookingRepository();
const service = new BookingService(repo);


const createSchema = z.object({
roomId: z.string().min(1),
start: z.string().datetime(),
end: z.string().datetime()
});


bookingRouter.post("/bookings", (req, res) => {
try {
const body = createSchema.parse(req.body);
const booking = service.create(
body.roomId,
new Date(body.start),
new Date(body.end)
);
res.status(201).json(booking);
} catch (err: any) {
res.status(400).json({ error: err.message });
}
});


bookingRouter.delete("/bookings/:id", (req, res) => {
try {
service.cancel(req.params.id);
res.status(204).send();
} catch (err: any) {
res.status(404).json({ error: err.message });
}
});


bookingRouter.get("/rooms/:roomId/bookings", (req, res) => {
const bookings = service.listByRoom(req.params.roomId);
res.json(bookings);
});