import { Op } from 'sequelize';
import db from '../database/models';

class Queries {
  static async create(table, data) {
    try {
      const datas = await table.create(data);
      return datas;
    } catch (error) {
      return error;
    }
  }
  static async update(table, data, condition) {
    try {
      const datas = await table.update(data // { isVerified: true, }; 
        , {
        where: condition, // { email }
        returning: true,
        plain: true,
      });
      return datas;
    } catch (error) {
      return error;
    }
  }
  static async findOrCreate(table, data, condition) {
    try {
      const datas = await table.findOrCreate({
        where: condition,
        defaults: data,
      });
      return datas[0];
    } catch (error) {
      return error;
    }
  }
  static async findOneRecord(table, value) {
    const data = await table.findOne({ where: value });
    if (data) {
      return data;
    }
    return false;
  }
  static async findAll(table, value) {
    const data = await table.findAll({ where: value });
    if (data) {
      return data;
    }
    return false;
  }

}
export default Queries;
