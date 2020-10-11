import response from "../helpers/response";
import Queries from "../services/Queries";
import Distance from "geo-distance";
import db from "../database/models";

class TripsController {
  static async createTrip(req, res) {
    try {
      const { riderId, driverId, comingFrom, goingTo } = req.body;
      const driver = await Queries.findOneRecord(db.user, {
        role: "driver",
        status: "available",
        id: driverId,
      });
      const rider = await Queries.findOneRecord(db.user, {
        role: "rider",
        id: riderId,
      });
      const comingFromLocation = await Queries.findOneRecord(db.location, {
        id: comingFrom,
      });
      const cordinateFrom = {
        lat: comingFromLocation.latitude,
        lon: comingFromLocation.longitude,
      };
      const goingToLocation = await Queries.findOneRecord(db.location, {
        id: goingTo,
      });
      const cordinateTo = {
        lat: goingToLocation.latitude,
        lon: goingToLocation.longitude,
      };
      if (!driver || !rider || !comingFromLocation || !goingToLocation) {
        return response.error(
          res,
          `Check Well that specific ${!driver ? "driver" : ""} ${
            !rider ? "and rider" : ""
          } ${!comingFromLocation ? "and coming from location" : ""}
                      ${
                        !goingToLocation ? "and going to location" : ""
                      } not available in our system or already booked`,
          404
        );
      }
      const kiloMeterCost = 500;
      var myLoToDriverLo = Distance.between(cordinateFrom, cordinateTo);
      const realDistance =
        myLoToDriverLo.unit == "km"
          ? parseFloat(myLoToDriverLo.human_readable().distance, 10)
          : 0.1;
      const price = kiloMeterCost * realDistance;
      const trip = await Queries.create(db.trip, {
        riderId,
        driverId,
        from: comingFrom,
        to: goingTo,
        distance: realDistance + " km",
        status: "active",
      });
      if (trip) {
        const tripInvoice = await Queries.create(db.invoice, {
          tripId: trip.id,
          cost: price + " rwf",
          status: trip.status,
        });
        const updateDriverStatus = await Queries.update(
          db.user,
          { status: "booked" },
          { id: driverId }
        );
        const tripInfo = {
          rider: rider.name,
          driver: driver.name,
          tripId: tripInvoice.tripId,
          invoiceId: tripInvoice.id,
          cost: tripInvoice.cost,
          status: tripInvoice.status,
        };
        return response.success(
          res,
          "Trip Successfully Created",
          201,
          tripInfo
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
      const trip = await Queries.findOneRecord(db.trip, {
        id: tripId,
      });
      if(trip){
      const completeTrip = await Queries.update(
        db.trip,
        { status: action },
        { id: tripId }
      );
      const updateDriverStatus = await Queries.update(
        db.user,
        { status: "available" },
        { id: trip.driverId }
      );
      if (completeTrip) {
        return response.success(res, "Trip Data", 200, completeTrip[1]);
      }          
    }
      return response.error(res, "No Trip found", 404);
    } catch (e) {
      return response.error(res, e.message, 500);
    }
  }
  static async getActiveTrips(req, res) {
    try {
      const availableTrip = await Queries.findAll(db.trip, {
        status: "active",
      });
      if (availableTrip) {
        return response.success(
          res,
          "List of active Trips",
          200,
          availableTrip
        );
      }
      return response.error(res, "No Available Trip", 404);
    } catch (e) {
      return response.error(res, e.message, 500);
    }
  }
}

export default TripsController;
