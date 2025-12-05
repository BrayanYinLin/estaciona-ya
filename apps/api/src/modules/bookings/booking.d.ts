export interface BookingRepository {
  findAllByGarageIdAndMinDate(
    garageId: number,
    minDate: Date
  ): Promise<Booking[]>
}
