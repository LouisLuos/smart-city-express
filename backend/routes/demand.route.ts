import { demandController } from "controllers/demand.controller.js";
import { Router } from 'express';
import { authMiddleware } from "middlewares/authMiddleware.js";

const demandRouter = Router();


demandRouter.post('/create', authMiddleware, demandController.create)
demandRouter.get('/', authMiddleware, demandController.list)


export default demandRouter