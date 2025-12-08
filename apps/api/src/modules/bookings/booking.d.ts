import { Booking } from './entities/booking.entity'

export interface BookingRepository {
  findAllByGarageIdAndMinDate(
    garageId: number,
    minDate: Date
  ): Promise<Booking[]>
  findConlictingBooking(
    garageId: number,
    startDate: Date,
    endDate: Date
  ): Promise<Booking[]>
}
