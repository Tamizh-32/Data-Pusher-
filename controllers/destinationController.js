
const Destination = require('../models/destination');
const Account = require('../models/account');

exports.createDestination = async (req, res) => {
  try {
    const { accountId } = req.params;
    const { url, httpMethod, headers } = req.body;

    const account = await Account.findByPk(accountId);
    if (!account) return res.status(404).json({ error: 'Account not found' });

    const destination = await Destination.create({
      url,
      httpMethod,
      headers,
      AccountAccountId: accountId
    });

    res.status(201).json(destination);
    console.log("Destination Created Successfully!: ",destination);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getDestinations = async (req, res) => {
  try {
    const { accountId } = req.params;
    const destinations = await Destination.findAll({ where: { AccountAccountId: accountId } });
    res.json(destinations);
    console.log("Destination List: ",destinations);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateDestination = async (req, res) => {
  try {
    const destination = await Destination.findByPk(req.params.id);
    if (!destination) return res.status(404).json({ error: 'Destination not found' });
    await destination.update(req.body);
    res.json(destination);
    console.log("Destination Updated Successflly!: ",destination);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteDestination = async (req, res) => {
  try {
    const destination = await Destination.findByPk(req.params.id);
    if (!destination) return res.status(404).json({ error: 'Destination not found' });
    await destination.destroy();
    res.json({ message: 'Destination deleted' });
    console.log("Destination Deleted Successflly!: ",destination);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
