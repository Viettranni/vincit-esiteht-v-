import { v4 as uuid } from 'uuid';
import { Booking } from '../models/booking.model';
import { BookingRepository } from '../repositories/booking.repository';
import { isOverlapping } from '../utils/time';

const ROOMS = ['A25', 'A26', 'A27', 'A28', 'A29', 'A30'];

export class BookingService {
  constructor(private repo: BookingRepository) {}

  private validateRoom(roomId: string): void {
    if (!ROOMS.includes(roomId)) {
      throw new Error(
        `Huonetta ei löydy. Sallitut huoneet: ${ROOMS.join(', ')}.`
      );
    }
  }

  private validateBookingTimeRange(start: Date, end: Date): void {
    const now = new Date();

    if (start >= end) {
      throw new Error('Aloitusajan tulee olla ennen lopetusaikaa.');
    }

    if (start < now) {
      throw new Error('Kokoushuoneen varaus ei voi olla menneisyydessä.');
    }
  }

  private validateAvailabilityTimeRange(start: Date, end: Date): void {
    if (start >= end) {
      throw new Error('Aloitusajan tulee olla ennen lopetusaikaa.');
    }
  }

  create(roomId: string, start: Date, end: Date): Booking {
    this.validateRoom(roomId);
    this.validateBookingTimeRange(start, end);

    const existing = this.repo.getByRoom(roomId);
    for (const booking of existing) {
      if (isOverlapping(booking.start, booking.end, start, end)) {
        throw new Error(
          'Havaittu päällekkäisyyksiä varauksissa, tarkista varaus!'
        );
      }
    }

    const booking: Booking = {
      id: uuid(),
      roomId,
      start,
      end,
    };

    this.repo.save(booking);
    return booking;
  }

  cancel(id: string): string {
    if (!id || typeof id !== 'string') {
      throw new Error('Varaustunnus on virheellinen.');
    }

    const success = this.repo.delete(id);

    if (!success) {
      throw new Error(
        'Kokoushuoneen varausta ei löydy. Tarkista varaustunnus.'
      );
    }

    return 'Varaus peruutettu onnistuneesti.';
  }

  listByRoom(roomId: string): Booking[] {
    this.validateRoom(roomId);

    return this.repo.getByRoom(roomId);
  }

  listAvailableRooms(start: Date, end: Date): string[] {
    this.validateAvailabilityTimeRange(start, end);

    const allBookings = this.repo.getAll();
    return ROOMS.filter((roomId) => {
      return !allBookings.some(
        (booking) =>
          booking.roomId === roomId &&
          isOverlapping(booking.start, booking.end, start, end)
      );
    });
  }
}
