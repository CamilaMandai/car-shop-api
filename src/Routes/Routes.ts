import { Router } from 'express';
import CarController from '../Controllers/CarController';

const routes = Router();

routes.post(
  '/car',
  (req, res, next) => new CarController(req, res, next).create(),
);

// routes.get(
//   '/car',
//   (req, res, next) => new CarController(req, res, next).teste(),
// );

export default routes;