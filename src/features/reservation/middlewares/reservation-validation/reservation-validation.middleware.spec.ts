import { ReservationValidationMiddleware } from './reservation-validation.middleware';

describe('ReservationValidationMiddleware', () => {
  it('should be defined', () => {
    expect(new ReservationValidationMiddleware()).toBeDefined();
  });
});
