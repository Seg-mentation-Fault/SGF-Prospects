//  models for database
const Prospect = require('../models/prospects');
//  Class to manipulate database
class DBstorage {
  /**
   * constructor for the DBstorage
   * @param  {} sequelize [conection to db storage]
   */
  constructor(sequelize) {
    this.prospect = Prospect(sequelize);
    this.client = sequelize;
    this.models = sequelize.models;
  }

  /**
   * createRecord - create a new record for a given model
   * @async
   * @param {String} model - The name of the model to create a new record
   * @param {Object} attributes - Object with data to create the new attribute.
   * @param {*} t - transaction of the ORM
   * @return {Object} newRecord - record for a given model
   */
  async createRecord(model, attributes, t) {
    const newRecord = await this.models[model].create(attributes, {
      transaction: t,
    });
    return newRecord;
  }

  /**
   * updateRecord - updates a old record (AUN NO HA SIDO TESTEADO)
   * @param {*} model - The name of the model delete a record
   * @param {*} oldRecordAttr - Attibutes of the old record
   * @param {*} newAttributes -the new attributes for a especific record
   * @param {*} t - transaction of the ORM
   * @returns
   */
  async updateRecord(model, oldRecordAttr, newAttributes, t) {
    const updated = await this.models[model].update(
      newAttributes,
      { where: oldRecordAttr },
      { transaction: t }
    );
    return updated;
  }

  /**
   * deleteRecord - delete a row for a given model
   * @param {String} model - The name of the model delete a record
   * @param {Object} attributes - Object with data to delete the instance.
   * @param {*} t - transaction of the ORM
   * @returns number of rows deleted
   */
  async deleteRecord(model, attributes, t) {
    const deleted = this.models[model].destroy(
      { where: attributes },
      { transaction: t }
    );
    return deleted;
  }
}

module.exports = DBstorage;
