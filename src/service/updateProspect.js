const { updateProspect } = require('../controllers/prospectController');

/**
 * putProspect - Update a prospect information
 * @async
 * @param {} storage - Constructor of the data base strorage.
 * @param {Object} attributes - Object with data to find & update a prospect
 * @param {Number} attributes.id - Prospect id
 * @param {String} attributes.email - String with a valid email
 * @param {String} attributes.name - String with the name
 */
const putProspect = async (storage, attributes) => {
  const t = await storage.client.transaction();

  try {
    // check if a prospect exists to update exists
    let prospect = await storage.prospect.findOne({
      where: { id: attributes.id },
    });
    if (prospect === null) {
      throw new Error(`The prospect does not exists`);
    }
    // set the new attributes to update
    const newAttr = { name: prospect.name, email: prospect.email };
    if (attributes.name) {
      newAttr.name = attributes.name;
    }
    if (attributes.email) {
      newAttr.capacity = attributes.email;
    }

    prospect = await updateProspect(storage, { id: prospect.id }, newAttr, t);
    if (prospect >= 1) {
      await t.commit();
      return { done: true };
    }
    throw new Error('Nothing was updated');
  } catch (error) {
    await t.rollback();
    throw error;
  }
};

exports.putProspect = putProspect;
