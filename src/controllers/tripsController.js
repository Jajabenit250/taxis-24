import response from "../helpers/response";
import Queries from "../services/Queries";
import Distance from "geo-distance";
import db from "../database/models";
import { geoDecode, reverse } from "../helpers/addressDecoder";

class TripsController {
  static async createTrip(req, res) {
    try {
      const { riderId, driverId, comingFrom, goingTo } = req.body;
      const trip = await Queries.create(db.trip, {
        riderId,
        driverId,
        from: comingFrom,
        to: goingTo,
      });
      if (trip) {
        const kiloMeterCost = 500;
        const comingFromLocation = await Queries.findOrCreate(db.location, {
          id: driver.comingFrom,
        });
        const cordinateFrom = {
          lat: comingFromLocation.latitude,
          lon: comingFromLocation.longitude,
        };
        const goingToLocation = await Queries.findOne(db.location, {
          id: driver.goingTo,
        });
        const cordinateTo = {
          lat: goingToLocation.latitude,
          lon: goingToLocation.longitude,
        };
        var myLoToDriverLo = Distance.between(cordinateFrom, cordinateTo);
        const price = kiloMeterCost * myLoToDriverLo;
        const tripInvoice = await Queries.create(db.invoice, {
          tripId: trip.id,
          cost: price,
          status: trip.id,
        });
        return response.successMessage(
          res,
          "Trip Successfully Created",
          200,
          tripInvoice
        );
      }
      return response.error(res, "Error while Creating the Trip", 404);
    } catch (e) {
      return response.error(res, e.message, 500);
    }
  }
  static async completeTrip(req, res) {
    try {
      const { tripId, action } = req.params;
      const complete = await Queries.update(
        db.trip,
        { status: action },
        { id: tripId }
      );
      if (complete) {
        return response.success(res, "Contact Message", 200, complete);
      }
      return response.error(res, "No message found", 404);
    } catch (e) {
      return response.error(res, e.message, 500);
    }
  }
  static async getActiveTrips(req, res) {
    try {
      const drivers = await Queries.findAll(db.trip, { status: "active" });
      if (drivers.count > 0) {
        return response.success(res, "List of available Drivers", 200, drivers);
      }
      return response.error(res, "No Available Driver", 404);
    } catch (e) {
      return response.error(res, e.message, 500);
    }
  }
}

export default TripsController;
