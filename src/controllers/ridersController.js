import response from "../helpers/response";
import Queries from "../services/Queries";

class RidersController {
    static async getRiders(req, res) {
    try {
      const drivers = await Queries.findAll(db.user, { role: 'rider' });
      if (drivers.count > 0) {
        return response.success(res, 'List of all Riders', 200, drivers);
      }
      return response.error(res, 'No Rider found', 404);
    } catch (e) {
      return response.error(res, e.message, 500);
    }
  }
      static async getSpecificRider(req, res) {
        try {
            const { riderId } = req.params;
            const rider = await Queries.findOne(db.user, { role: 'rider', id: riderId });
            if (rider.count > 0) {
              return response.success(res, 'Rider Information', 200, rider);
            }
            return response.error(res, 'that specific Rider is not available', 404);
          } catch (e) {
            return response.error(res, e.message, 500);
          }
    }
    static async getClosestDrivers(req, res) {
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
                  return myLoToDriverLo
             })
             // shortest distance loop into availableDrivers array
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
}


export default RidersController;