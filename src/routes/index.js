import express from 'express';
import DriversRoute from './driversRoute';
import RidersRoute from './ridersRoute';
import TripsRoute from './tripsRoute';


const Router = express.Router();

Router.use('/drivers', DriversRoute);
Router.use('/trips', RidersRoute);
Router.use('/riders', TripsRoute);

export default Router;