/**
 * createProspect- Verify if a prospect alrready exists by email, create a new if don't exists
 * @async
 * @param {Object} attributes - Object with data to create the new prospect
 * @param {String} attributes.email - String with a valid email
 * @param {String} attributes.name - String with the name
 * @return {Object} prospect - record of the new prospect
 */
const createProspect = async (storage, attributes, t) => {
  try {
    //  checks if the prospect exits by email
    let prospect = await storage.prospect.findOne({
      where: { email: attributes.email },
    });
    if (prospect === null) {
      prospect = await storage.createRecord(
        'Prospect',
        {
          name: attributes.name,
          email: attributes.email,
        },
        t
      );
    }
    return prospect;
  } catch (err) {
    throw err;
  }
};

/**
 * getprospect - verify if a prospect exits or does not exits
 * @async
 * @param {} storage - Constructor of the data base strorage.
 * @param {Object} attributes - Object with data to get a prospect
 * @param {String} attributes.email - String with a valid email
 * @return {Object} prospect - record of prospect to find or not if does not exits
 */
const getProspect = async (storage, attributes) => {
  try {
    const prospect = await storage.prospect.findOne({
      where: { id: attributes.id },
      raw: true,
    });
    if (prospect) {
      return prospect;
    }
    throw new Error('there is no such prospect');
  } catch (err) {
    throw err;
  }
};

/**
 * getAllProspects - gives all the prospects for all reservations
 * @async
 * @param {} storage - Constructor of the data base strorage.
 * @param {object} attributes - object with the data neded, not neccessary
 * @param {date} attributes.date - the day when the prospect create the reseravation
 * @param {integer} attributes.ParkId - the Id number of the Park
 * @return {Object} prospect - record of prospect to find or not if does not exits
 */
const getAllProspects = async (storage) => {
  try {
    const prospects = await storage.prospect.findAll({ raw: true });
    return prospects;
  } catch (err) {
    throw err;
  }
};

/**
 * deleteprospect - delete an prospect by email
 * @async
 * @param {} storage - Constructor of the data base strorage.
 * @param {object} attributes - object with the data neded
 * @param {string} attributes.id - prospect id
 * @param {} t - the key for the transactions
 * @return {integer} prospect - a number greather than 0 of the deleted records
 */
const deleteProspect = async (storage, attributes, t) => {
  try {
    const deleteattr = { id: attributes.id };
    const deleted = await storage.deleteRecord('prospect', deleteattr, t);
    if (deleted >= 1) {
      return { done: true };
    }
    throw new Error('nothig was deleted');
  } catch (err) {
    throw err;
  }
};

/**
 * updateprospect - updates an prospect by email
 * @async
 * @param {} storage - Constructor of the data base strorage.
 * @param {object} Oldattributes - object with the data neded
 * @param {string} Oldattributes.email - the email of the prospect to be updated
 * @param {object} newAttributes - the object with the attributes to be updated
 * @param {} t - the key for the transaction action
 * @return {integer} prospect - a number grether tan 0 of the records updates
 */
const updateProspect = async (storage, oldAttributes, newAttributes, t) => {
  try {
    const updated = await storage.updateRecord(
      'prospect',
      oldAttributes,
      newAttributes,
      t
    );
    return updated[0];
  } catch (err) {
    throw err;
  }
};

exports.createProspect = createProspect;
exports.getProspect = getProspect;
exports.getAllProspects = getAllProspects;
exports.deleteProspect = deleteProspect;
exports.updateProspect = updateProspect;
