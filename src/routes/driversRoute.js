import express from 'express';
import DriversController from "../controllers/driversController";

const router = express.Router();
router.get('/', DriversController.getDrivers);
router.get('/available', DriversController.getAvailableDrivers);
router.get('/closeto/:locationId', DriversController.getDriversWithinLocation);
router.get('/:driverId', DriversController.getSpecificDrivers);

export default router;
