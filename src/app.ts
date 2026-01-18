import express from "express";
import { bookingRouter } from "./routes/bookings.routes";


export const app = express();


app.use(express.json());
app.use("/", bookingRouter);