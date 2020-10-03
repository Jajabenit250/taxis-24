import response from "../helpers/response";
import Queries from "../services/Queries";
import Distance from "geo-distance";
import { geoDecode, reverse } from "../helpers/addressDecoder";

class TripsController {
  static async createTrip(req, res) {
    try {
      const { riderId, driverId, comingFrom, goingTo } = req.body;
      const trip = await Queries.create(db.trip, { riderId, driverId, comingFrom, goingTo });
      if (trip) {
          // trip cost and create invoices after save invoice to invoice table 
        return response.successMessage(res, "Trip Successfully Created", 200, messages);
      }
      return response.errorMessage(res, "Error while Creating the Trip", 404);
    } catch (e) {
      return response.errorMessage(res, e.message, 500);
    }
  }
  static async completeTrip(req, res) {
    try {
      const { tripId, action } = req.params;
      const complete = await Queries.update(db.trip, {status: action}, {id: tripId});
      if (messages.count > 0) {
        return response.successMessage(res, 'Contact Message', 200, messages);
      }
      return response.errorMessage(res, 'No message found', 404);
    } catch (e) {
      return response.errorMessage(res, e.message, 500);
    }
  }
  static async getActiveTrips(req, res) {
    try {
        const drivers = await Queries.findAll(db.trip, { status: 'active' });
        if (drivers.count > 0) {
          return response.success(res, 'List of available Drivers', 200, drivers);
        }
        return response.error(res, 'No Available Driver', 404);
      } catch (e) {
        return response.error(res, e.message, 500);
      }
  }
}

export default TripsController;
