import { v4 as uuid } from 'uuid';
import { Booking } from '../models/booking.model';
import { BookingRepository } from '../repositories/booking.repository';
import { isOverlapping } from '../utils/time';

export class BookingService {
  constructor(private repo: BookingRepository) {}

  create(roomId: string, start: Date, end: Date): Booking {
    const now = new Date();

    if (start >= end) {
      throw new Error(
        'Minimi varausaika on 1 päivä. Aloitusajan tulee alkaa ennen päättymisaikaa.'
      );
    }

    if (start < now) {
      throw new Error('Kokoushuoneen varaus ei voi olla menneisyydessä.');
    }

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

  cancel(id: string): void {
    const success = this.repo.delete(id);
    if (!success) {
      throw new Error(
        'Kokoushuoneen varausta ei löydy. Tarkista varaustunnus.'
      );
    }
  }

  listByRoom(roomId: string): Booking[] {
    return this.repo.getByRoom(roomId);
  }
}
