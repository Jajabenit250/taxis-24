import response from "../helpers/response";
import Queries from "../services/Queries";
import Distance from "geo-distance";
import { geoDecode, reverse } from "../helpers/addressDecoder";

class DriversController {
  static async getDrivers(req, res) {
    try {
      const drivers = await Queries.findAll(db.user, { role: 'driver' });
      if (drivers.count > 0) {
        return response.success(res, 'List of Drivers', 200, drivers);
      }
      return response.error(res, 'No Driver found', 404);
    } catch (e) {
      return response.error(res, e.message, 500);
    }
  }
  static async getAvailableDrivers(req, res) {
    try {
        const drivers = await Queries.findAll(db.user, { role: 'driver', status: 'available' });
        if (drivers.count > 0) {
          return response.success(res, 'List of available Drivers', 200, drivers);
        }
        return response.error(res, 'No Available Driver', 404);
      } catch (e) {
        return response.error(res, e.message, 500);
      }
  }
  static async getDriversWithinLocation(req, res) {
    try {
        const { location } = req.params;
        const decodeLocation = geoDecode(location);
        const locationCoordinate = {
            lat: decodeLocation.latitude,
            lon: decodeLocation.longitude
        }
        const drivers = await Queries.findAll(db.user, { role: 'driver', status: 'available' });
        if (drivers.count > 0) {
         const availableDrivers = drivers.map(async driver => {
            const driverLocation = await Queries.findAll(db.location, { id: driver.locationId });
            const cordinate = {
                lat: driverLocation.latitude,
                lon: driverLocation.longitude
              };
              var myLoToDriverLo = Distance.between(locationCoordinate, cordinate);
              if (myLoToDriverLo > Distance('3 km')) {
                return driver
              }
              else {
                  return null;
              }
         })
         if (availableDrivers.length > 0){
            return response.success(res, 'List of available Drivers', 200, availableDrivers);
         }
         else {
            return response.error(res, 'No Available Driver Within that location', 404);
         }
        }
        return response.error(res, 'No Available Driver', 404);
      } catch (e) {
        return response.error(res, e.message, 500);
      }
  }
  static async getSpecificDrivers(req, res) {
    try {
        const { driverId } = req.params;
        const driver = await Queries.findOne(db.user, { role: 'driver', id: driverId });
        if (driver.count > 0) {
          return response.success(res, 'Driver Information', 200, driver);
        }
        return response.error(res, 'that specific driver is not available', 404);
      } catch (e) {
        return response.error(res, e.message, 500);
      }
  }
}

export default DriversController;
