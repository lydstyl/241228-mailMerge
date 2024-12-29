export class RentCalculator {
  static calculateNewRent(
    lastIndex: number,
    newIndex: number,
    rentNoCharges: number,
    charges: number
  ): { newRentNoCharges: number; nouveauLoyer: number } {
    const newRentNoCharges = (newIndex * rentNoCharges) / lastIndex
    const nouveauLoyer = newRentNoCharges + charges
    return { newRentNoCharges, nouveauLoyer }
  }
}
