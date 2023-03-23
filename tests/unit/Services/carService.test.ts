import { expect } from 'chai';
import sinon from 'sinon';
import { Model } from 'mongoose';
import Car from '../../../src/Domains/Car';
import ICar from '../../../src/Interfaces/ICar';
import CarService from '../../../src/Services/CarService';

describe('Deveria validar e criar carro', function () {
  it('Criando um carro com SUCESSO', async function () {
    const carInput: ICar = {
      model: 'Strada', 
      year: 2013, 
      color: 'white', 
      status: true, 
      buyValue: 40000, 
      doorsQty: 2, 
      seatsQty: 2,
    };
    const carOutput: Car = new Car(
      {
        model: 'Strada', 
        year: 2013, 
        color: 'white', 
        status: true, 
        buyValue: 40000, 
        doorsQty: 2, 
        seatsQty: 2,
        id: '641b776daa1784ec9e70efbd',
      },
    );
    sinon.stub(Model, 'create').resolves(carOutput);

    const service = new CarService();
    const result = await service.register(carInput);

    expect(result).to.be.deep.equal(carOutput);
  });

  it('Entrando na rota get /cars', async function () {
    const carOutput: Car[] = [new Car(
      {
        model: 'Strada', 
        year: 2013, 
        color: 'white', 
        status: true, 
        buyValue: 40000, 
        id: '641b776daa1784ec9e70efbd',
        doorsQty: 2, 
        seatsQty: 2,
      },
    )];
    sinon.stub(Model, 'find').resolves(carOutput);

    const carService = new CarService();
    const result = await carService.findAll();

    expect(result).to.be.deep.equal(carOutput);
  });

  it('Entrando na rota get /cars/:id', async function () {
    const carOutput = {
      model: 'Strada', 
      year: 2013, 
      color: 'white', 
      status: true, 
      buyValue: 40000, 
      _id: '641b776daa1784ec9e70efbd',
      doorsQty: 2, 
      seatsQty: 2,
    };
    const carOutputService = {
      model: 'Strada', 
      year: 2013, 
      color: 'white', 
      status: true, 
      buyValue: 40000, 
      id: '641b776daa1784ec9e70efbd',
      doorsQty: 2, 
      seatsQty: 2,
    };
    sinon.stub(Model, 'findById').resolves(carOutput);

    const carService = new CarService();
    const result = await carService.findById('641b776daa1784ec9e70efbd');

    expect(result).to.be.deep.equal(carOutputService);
  });

  it('Entrando na rota get /cars/:id com id inválido', async function () {
    const invalidMongoId = 'xx641b776daa1784ec9e70efbd';
    sinon.stub(Model, 'findById').resolves({});

    const carService = new CarService();
    const result = await carService.findById(invalidMongoId);
    expect(result.message).to.be.equal('Invalid mongo id');
  });

  it('Entrando na rota get /cars/:id com id não encontrado', async function () {
    const validMongoId = '641b776daa1784ec9e70efbd';
    sinon.stub(Model, 'findById').resolves(null);

    const carService = new CarService();
    const result = await carService.findById(validMongoId);
    expect(result.message).to.be.equal('Car not found');
  });

  afterEach(function () {
    sinon.restore();
  });
});
