import { Injectable, NotFoundException } from '@nestjs/common';
import { Car } from './interfaces/car.interface';
import { v4 as uuid } from 'uuid';
import { CreateCarDto } from './dto/create-car.dto';

@Injectable()
export class CarsService {
  private cars: Car[] = [
    { id: uuid(), brand: 'Toyota', model: 'Corolla' },
    { id: uuid(), brand: 'Honda', model: 'Civic' },
    { id: uuid(), brand: 'Jepp', model: 'Cherokee' },
  ];

  findAll() {
    return this.cars;
  }

  findOneById(id: string) {
    const CAR = this.cars.find((car) => car.id === id);

    if (!CAR) throw new NotFoundException(`Car with id: ${id} not found`);

    return CAR;
  }

  create({ model, brand }: CreateCarDto) {
    const newCar: Car = {
      id: uuid(),
      brand,
      model,
    };
    this.cars.push(newCar);
    return newCar;
  }
}
