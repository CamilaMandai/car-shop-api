import IMotorcycle from '../Interfaces/IMotorcycle';
import Vehicle from './Vehicle';

export default class Motorcycle extends Vehicle {
  private category: string;
  private engineCapacity: number;

  constructor(params: IMotorcycle) {
    super(params);
    this.category = params.category;
    this.engineCapacity = params.engineCapacity;
  }
}