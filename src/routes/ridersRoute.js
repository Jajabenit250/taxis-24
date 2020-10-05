import express from 'express';
import RidersController from "../controllers/ridersController";

const router = express.Router();

router.get('/', RidersController.getRiders);
router.get('/:riderId', RidersController.getSpecificRider);
router.get('/closest/:driverId', RidersController.getClosestDrivers);

export default router;
