import { v4 as uuid } from "uuid";
import { Booking } from "../models/booking.model";
import { BookingRepository } from "../repositories/booking.repository";
import { isOverlapping } from "../utils/time";


export class BookingService {
constructor(private repo: BookingRepository) {}


create(roomId: string, start: Date, end: Date): Booking {
const now = new Date();


if (start >= end) {
throw new Error("Start time must be before end time");
}


if (start < now) {
throw new Error("Booking cannot be in the past");
}


const existing = this.repo.getByRoom(roomId);
for (const booking of existing) {
if (isOverlapping(booking.start, booking.end, start, end)) {
throw new Error("Booking overlaps with existing booking");
}
}


const booking: Booking = {
id: uuid(),
roomId,
start,
end
};


this.repo.save(booking);
return booking;
}


cancel(id: string): void {
const success = this.repo.delete(id);
if (!success) {
throw new Error("Booking not found");
}
}


listByRoom(roomId: string): Booking[] {
return this.repo.getByRoom(roomId);
}
}