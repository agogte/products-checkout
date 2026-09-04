import { Router } from 'express';
import { get } from '../controllers/base.controller';

const router = Router();

router.get("/", get);

export default router;