const { transporter } = require('./email');
const { createProspect } = require('../controllers/prospectController');

/**
 * newProspect - Post a new prospect and new prospect if needed
 * @async
 * @param {} storage - Constructor of the data base strorage.
 * @param {Object} attributes - Object with data to find a prospect or create it
 * @param {String} attributes.email - String with a valid email
 * @param {String} attributes.name - String with the name
 * @return {Object} prospect - record of the new prospect
 */
const newProspect = async (storage, attributes) => {
  const t = await storage.client.transaction();

  try {
    const prospect = await createProspect(storage, attributes, t);
    const message = {
      from: 'reservation.av.calendar@gmail.com',
      to: attributes.email,
      subject: `Welcome to Segmentation Fault News Letter`,
      text: `Thanks for subscribing to the Segmentation Fault Availability Calendar newsletter.

      We will be informing you about the most important update of the project so that you are aware.`,
    };
    transporter.sendMail(message, (err) => {
      if (err) {
        throw err;
      }
    });
    await t.commit();
    return { prospect };
  } catch (error) {
    await t.rollback();
    throw error;
  }
};

exports.newProspect = newProspect;
