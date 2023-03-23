import ICar from '../Interfaces/ICar';
import Vehicle from './Vehicle';

export default class Car extends Vehicle {
  private doorsQty: number;
  private seatsQty: number;

  constructor(params: ICar) {
    super(params);

    this.doorsQty = params.doorsQty;
    this.seatsQty = params.seatsQty;
  }
}
