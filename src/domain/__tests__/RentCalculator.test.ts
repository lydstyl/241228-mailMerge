import { RentCalculator } from '../services/RentCalculator'

describe('RentCalculator', () => {
  it('should calculate new rent correctly', () => {
    const lastIndex = 138.61
    const newIndex = 143.46
    const rentNoCharges = 462.34
    const charges = 42

    const { newRentNoCharges, newRent } = RentCalculator.calculateNewRent(
      lastIndex,
      newIndex,
      rentNoCharges,
      charges
    )

    expect(newRentNoCharges).toBeCloseTo(478.52, 2)
    expect(newRent).toBeCloseTo(520.52, 2)
  })
})
