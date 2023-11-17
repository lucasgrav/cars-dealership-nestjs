import { Controller, Get, Param } from '@nestjs/common';

@Controller('cars')
export class CarsController {
  private cars = ['Toyota', 'Honda', 'Jeep'];
  @Get()
  getAllCars() {
    return this.cars;
  }

  @Get(':id')
  getCardById(@Param('id') id: string) {
    return this.cars[id];
  }
}
