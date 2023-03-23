import Motorcycle from '../Domains/Motorcycle';
import IMotorcycle from '../Interfaces/IMotorcycle';
import MotorcycleODM from '../Models/MotorcycleODM';

class MotorcycleService {
  private createMotorCycleDomain(motorcycle: IMotorcycle | null): Motorcycle | null {
    if (motorcycle) return new Motorcycle(motorcycle);
    return null;
  }

  public async register(moto: IMotorcycle) {
    const motoODM = new MotorcycleODM();
    const newMoto = await motoODM.create(moto);
    return this.createMotorCycleDomain(newMoto);
  }

  public async findAll() {
    const motoODM = new MotorcycleODM();
    const allMotos = await motoODM.findAll();
    const carList = allMotos.map((oneMoto) => this.createMotorCycleDomain(oneMoto));
    return carList;
  }

  public async findById(id: string) {
    const motoODM = new MotorcycleODM();
    try {
      const result = await motoODM.findById(id);
      if (!result) {
        return { type: 404, message: 'Motorcycle not found' };
      }
      const { model, year, color, status, buyValue, category, engineCapacity } = result;
      return { 
        id: result._id,
        model, 
        year, 
        color, 
        status, 
        buyValue, 
        category,
        engineCapacity,
      };
    } catch (error) {
      return { type: 422, message: (error as Error).message };
    }
  }

  public async update(id: string, moto: IMotorcycle) {
    const motoODM = new MotorcycleODM();
    const result = await motoODM.update(id, moto);
    return this.createMotorCycleDomain(result);
  }
}
   
export default MotorcycleService;