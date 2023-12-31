import { Injectable, NotFoundException } from '@nestjs/common';
import { Car } from './interfaces/car.interface';
import { v4 as uuid } from 'uuid';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';

@Injectable()
export class CarsService {
  private cars: Car[] = [
    /*   { id: uuid(), brand: 'Toyota', model: 'Corolla' },
     */
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

  update(id: string, updateCarDto: UpdateCarDto) {
    let carDB = this.findOneById(id);
    this.cars = this.cars.map((car) => {
      if (car.id === id) {
        carDB = {
          ...carDB,
          ...updateCarDto,
          id,
        };

        return carDB;
      }
      return car;
    });

    return carDB;
  }

  delete(id: string) {
    const car = this.findOneById(id);

    this.cars = this.cars.filter((car) => car.id !== id);

    return car;
  }

  fillCarsWithSeedData(cars: Car[]) {
    this.cars = cars;
  }
}
