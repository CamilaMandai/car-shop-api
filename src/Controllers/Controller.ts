import { NextFunction, Request, Response } from 'express';
import ICar from '../Interfaces/ICar';
import IMotorcycle from '../Interfaces/IMotorcycle';
import CarService from '../Services/CarService';
import MotorcycleService from '../Services/MotorcycleService';

export default class Controller {
  private req: Request;
  private res: Response;
  private next: NextFunction;
  private service: MotorcycleService | CarService;

  constructor(
    req: Request, 
    res: Response, 
    next: NextFunction, 
    service: MotorcycleService | CarService,
  ) {
    this.req = req;
    this.res = res;
    this.next = next;
    this.service = service;
  }

  async create() {
    const vehicle:IMotorcycle & ICar = { ...this.req.body };

    try {
      const newVehicle = await this.service.register(vehicle);
      return this.res.status(201).json(newVehicle);
    } catch (error) {
      this.next(error);
    }
  }

  async findAll() {
    const allVehicles = await this.service.findAll();
    return this.res.status(200).json(allVehicles);
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