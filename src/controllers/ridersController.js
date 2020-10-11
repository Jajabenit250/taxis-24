import response from "../helpers/response";
import Queries from "../services/Queries";
import db from "../database/models";
import Distance from "geo-distance";

class RidersController {
  static async getRiders(req, res) {
    try {
      const drivers = await Queries.findAll(db.user, { role: "rider" });
      if (drivers) {
        return response.success(res, "List of all Riders", 200, drivers);
      }
      return response.error(res, "No Rider found", 404);
    } catch (e) {
      return response.error(res, e.message, 500);
    }
  }
  static async getSpecificRider(req, res) {
    try {
      const { riderId } = req.params;
      const rider = await Queries.findOneRecord(db.user, {
        role: "rider",
        id: riderId,
      });
      if (rider) {
        return response.success(res, "Rider Information", 200, rider);
      }
      return response.error(res, "that specific Rider is not available", 404);
    } catch (e) {
      return response.error(res, e.message, 500);
    }
  }
  static async getClosestDrivers(req, res) {
    try {
      const { driverId } = req.params;
      const driverData = await Queries.findOneRecord(db.user, {
        role: "driver",
        id: driverId,
      });
      if(driverData){
      const decodeLocation = await Queries.findOneRecord(db.location, {
        id: driverData.locationId,
      });
      const locationCoordinate = {
        lat: decodeLocation.latitude,
        lon: decodeLocation.longitude,
      };
      const drivers = await Queries.findAll(db.user, {
        role: "driver",
        status: "available",
      });
      if (drivers) {
        const availableDrivers = await Promise.all(
          drivers.map(async (driver) => {
            const driverLocation = await Queries.findOneRecord(db.location, {
              id: driver.locationId,
            });
            const cordinate = {
              lat: driverLocation.latitude,
              lon: driverLocation.longitude,
            };
            const myLoToDriverLo = Distance.between(
              locationCoordinate,
              cordinate
            );
            const DistanceToDriver =
              (myLoToDriverLo.unit == "km")
                ? parseFloat(myLoToDriverLo.human_readable().distance, 10)
                : parseFloat(myLoToDriverLo.human_readable().distance, 10)/1000;
            const allDatas = {
              driver,
              DistanceToDriver
            }
            return allDatas;
          })
        );
        const sortedAvailableDrivers = availableDrivers.sort((a, b) => {
          const driverOne = a.DistanceToDriver,
            driverTwo = b.DistanceToDriver;
          if (driverOne < driverTwo) return -1;
          if (driverOne > driverTwo) return 1;
          return 0;
        });
        if (availableDrivers.length > 0) {
          return response.success(
            res,
            "List of closest Drivers",
            200,
            sortedAvailableDrivers.slice(0, 3)
          );
        } else {
          return response.error(
            res,
            "No Available Driver Within that location",
            404
          );
        }
      }
    }
      return response.error(res, "No Available Driver", 404);
    } catch (e) {
      return response.error(res, e.message, 500);
    }
  }
}

export default RidersController;
