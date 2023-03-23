import { NextFunction, Request, Response } from 'express';
import ICar from '../Interfaces/ICar';
import CarService from '../Services/CarService';

export default class CarController {
  private req: Request;
  private res: Response;
  private next: NextFunction;
  private service: CarService;

  constructor(req: Request, res: Response, next: NextFunction) {
    this.req = req;
    this.res = res;
    this.next = next;
    this.service = new CarService();
  }

  async create() {
    const { model, year, color, status, buyValue, doorsQty, seatsQty } = this.req.body;
    const car: ICar = {
      model,
      year,
      color,
      status,
      buyValue,
      doorsQty,
      seatsQty,
    };

    try {
      const newCar = await this.service.register(car);
      return this.res.status(201).json(newCar);
    } catch (error) {
      this.next(error);
    }
  }

  async findAll() {
    const allCars = await this.service.findAll();
    return this.res.status(200).json(allCars);
  }

  async findById() {
    const { id } = this.req.params;
    const result = await this.service.findById(id);
    if (result.type) {
      return this.res.status(result.type).json({ message: result.message });
    }
    return this.res.status(200).json(result);
  }

  async update() {
    const { id } = this.req.params;
    try {
      const result = await this.service.update(id, this.req.body);
      if (!result) {
        return this.res.status(404).json({ message: 'Car not found' });
      }
      return this.res.status(200).json(result);
    } catch (error) {
      return this.res.status(422).json({ message: (error as Error).message });
    }
  }
  // teste() {
  //   return this.res.status(201).json('olá');
  // }
}
