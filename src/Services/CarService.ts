import ICar from '../Interfaces/ICar';
import Car from '../Domains/Car';
import CarODM from '../Models/CarODM';

class CarService {
  private createCarDomain(car: ICar | null): Car | null {
    if (car) {
      return new Car(
        { 
          model: car.model,
          year: car.year,
          color: car.color,
          buyValue: car.buyValue,
          id: car.id,
          status: car.status,
          doorsQty: car.doorsQty,
          seatsQty: car.seatsQty,
        },
      );
    }
    return null;
  }

  public async register(car: ICar) {
    const carODM = new CarODM();
    const newCar = await carODM.create(car);
    return this.createCarDomain(newCar);
  }

  public async findAll() {
    const carODM = new CarODM();
    const allCars = await carODM.findAll();
    const carList = allCars.map((oneCar) => this.createCarDomain(oneCar));
    return carList;
  }

  public async findById(id: string) {
    const carODM = new CarODM();

    try {
      const result = await carODM.findById(id);
      if (!result) {
        return { type: 404, message: 'Car not found' };
      }
      const { model, year, color, status, buyValue, doorsQty, seatsQty } = result;
      return { 
        id: result._id,
        model, 
        year, 
        color, 
        status, 
        buyValue, 
        doorsQty, 
        seatsQty,
      };
      // return this.createCarDomain(result);
    } catch (error) {
      return { type: 422, message: (error as Error).message };
    }
  }

  public async update(id: string, car: ICar) {
    const carODM = new CarODM();
    const result = await carODM.update(id, car);
    return this.createCarDomain(result);
  }
}
   
export default CarService;