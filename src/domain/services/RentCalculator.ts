export class RentCalculator {
  static calculateNewRent(
    lastIndex: number,
    newIndex: number,
    rentNoCharges: number,
    charges: number
  ): { newRentNoCharges: number; newRent: number } {
    const newRentNoCharges = (newIndex * rentNoCharges) / lastIndex
    const newRent = newRentNoCharges + charges
    return { newRentNoCharges, newRent }
  }
}
