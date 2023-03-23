import { expect } from 'chai';
import sinon from 'sinon';
import { Model } from 'mongoose';
import Motorcycle from '../../../src/Domains/Motorcycle';
import IMotorcycle from '../../../src/Interfaces/IMotorcycle';
import MotorcycleService from '../../../src/Services/MotorcycleService';

describe('Deveria validar e criar Motorcycle', function () {
  it('Criando um Motorcyclero com SUCESSO', async function () {
    const motorcycleInput: IMotorcycle = {
      model: 'Bros', 
      year: 2013, 
      color: 'white', 
      status: true, 
      buyValue: 40000, 
      category: 'Trail', 
      engineCapacity: 2,
    };
    const motorcycleOutput: Motorcycle = new Motorcycle(
      {
        model: 'Bros', 
        year: 2013, 
        color: 'white', 
        status: true, 
        buyValue: 40000, 
        category: 'Trail', 
        engineCapacity: 2,
        id: '641b776daa1784ec9e70efbd',
      },
    );
    sinon.stub(Model, 'create').resolves(motorcycleOutput);

    const service = new MotorcycleService();
    const result = await service.register(motorcycleInput);

    expect(result).to.be.deep.equal(motorcycleOutput);
  });

  it('Entrando na rota get /motorcycles', async function () {
    const motorcycleOutput: Motorcycle[] = [new Motorcycle(
      {
        model: 'Bros', 
        year: 2013, 
        color: 'white', 
        status: true, 
        buyValue: 40000, 
        id: '641b776daa1784ec9e70efbd',
        category: 'Trail', 
        engineCapacity: 2,
      },
    )];
    sinon.stub(Model, 'find').resolves(motorcycleOutput);

    const motorcycleService = new MotorcycleService();
    const result = await motorcycleService.findAll();

    expect(result).to.be.deep.equal(motorcycleOutput);
  });

  it('Entrando na rota get /motorcycles/:id', async function () {
    const motorcycleOutput = {
      model: 'Bros', 
      year: 2013, 
      color: 'white', 
      status: true, 
      buyValue: 40000, 
      _id: '641b776daa1784ec9e70efbd',
      category: 'Trail', 
      engineCapacity: 2,
    };
    const motorcycleOutputService = {
      model: 'Bros', 
      year: 2013, 
      color: 'white', 
      status: true, 
      buyValue: 40000, 
      id: '641b776daa1784ec9e70efbd',
      category: 'Trail', 
      engineCapacity: 2,
    };
    sinon.stub(Model, 'findById').resolves(motorcycleOutput);

    const motorcycleService = new MotorcycleService();
    const result = await motorcycleService.findById('641b776daa1784ec9e70efbd');

    expect(result).to.be.deep.equal(motorcycleOutputService);
  });

  it('Entrando na rota get /motorcycles/:id com id inválido', async function () {
    const invalidMongoId = 'xx641b776daa1784ec9e70efbd';
    sinon.stub(Model, 'findById').resolves({});

    const motorcycleService = new MotorcycleService();
    const result = await motorcycleService.findById(invalidMongoId);
    expect(result.message).to.be.equal('Invalid mongo id');
  });

  it('Entrando na rota get /motorcycles/:id com id não encontrado', async function () {
    const validMongoId = '641b776daa1784ec9e70efbd';
    sinon.stub(Model, 'findById').resolves(null);

    const motorcycleService = new MotorcycleService();
    const result = await motorcycleService.findById(validMongoId);
    expect(result.message).to.be.equal('Motorcycle not found');
  });

  afterEach(function () {
    sinon.restore();
  });
});
