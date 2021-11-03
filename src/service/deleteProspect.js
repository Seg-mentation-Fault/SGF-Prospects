const { deleteProspect } = require('../controllers/prospectController');

/**
 * newProspect - Post a new prospect and new prospect if needed
 * @async
 * @param {} storage - Constructor of the data base strorage.
 * @param {Object} attributes - Object with data to find a prospect or create it
 * @param {Number} attributes.id - Prospect id
 */
const dropProspect = async (storage, attributes) => {
  const t = await storage.client.transaction();

  try {
    // check if a prospect exists to update exists
    let prospect = await storage.prospect.findOne({
      where: { id: attributes.id },
    });
    if (prospect === null) {
      throw new Error(`The prospect does not exists`);
    }
    prospect = await deleteProspect(storage, { id: attributes.id }, t);
    return prospect;
  } catch (error) {
    await t.rollback();
    throw error;
  }
};

exports.dropProspect = dropProspect;
