import express from 'express';
import TripsController from "../controllers/tripsController";
// { createTrip, completTrip, getActiveTrips} 
const router = express.Router();

router.post('/', TripsController.createTrip);
router.put('/:tripId/:action', TripsController.completeTrip);
router.get('/:active', TripsController.getActiveTrips);

export default router;
