import { Booking } from '../models/booking.model';

export class BookingRepository {
  private bookings: Booking[] = [];

  getByRoom(roomId: string): Booking[] {
    return this.bookings.filter((b) => b.roomId === roomId);
  }

  getAll(): Booking[] {
    return this.bookings;
  }

  save(booking: Booking): void {
    this.bookings.push(booking);
  }

  delete(id: string): boolean {
    const index = this.bookings.findIndex((b) => b.id === id);
    if (index === -1) return false;
    this.bookings.splice(index, 1);
    return true;
  }
}
