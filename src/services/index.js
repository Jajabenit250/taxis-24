import db from '../database/models';
import Queries from './Queries';

class TaxiServices {
  static async Createlevel(data) {
    return Queries.create(db.level, data);
  }

  static async GetUser(data) {
    return Queries.findAll(db.user, data);
  }

  static async findLevelById(id) {
    try {
      return await db.level.findOne({
        where: { id },
      });
    } catch (error) {
      return null;
    }
  }
}
export default TaxiServices;
