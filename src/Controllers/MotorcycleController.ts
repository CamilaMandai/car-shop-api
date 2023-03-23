import { NextFunction, Request, Response } from 'express';
import IMotorcycle from '../Interfaces/IMotorcycle';
import MotorcycleService from '../Services/MotorcycleService';

export default class MotorcycleController {
  private req: Request;
  private res: Response;
  private next: NextFunction;
  private service: MotorcycleService;

  constructor(req: Request, res: Response, next: NextFunction) {
    this.req = req;
    this.res = res;
    this.next = next;
    this.service = new MotorcycleService();
  }

  async create() {
    const { model, year, color, status, buyValue, category, engineCapacity } = this.req.body;
    const moto: IMotorcycle = {
      model,
      year,
      color,
      status,
      buyValue,
      category,
      engineCapacity,
    };

    try {
      const newMoto = await this.service.register(moto);
      return this.res.status(201).json(newMoto);
    } catch (error) {
      this.next(error);
    }
  }

  async findAll() {
    const allMotos = await this.service.findAll();
    return this.res.status(200).json(allMotos);
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
        return this.res.status(404).json({ message: 'Motorcycle not found' });
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
