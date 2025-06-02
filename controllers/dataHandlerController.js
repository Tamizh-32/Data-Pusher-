const Account = require('../models/account');
const Destination = require('../models/destination');
const axios = require('axios');

exports.incomingData = async (req, res) => {
  try {
    const secretToken = req.header('CL-X-TOKEN');
    if (!secretToken) {
      return res.status(401).json({ error: 'Un Authenticate' });
    }

    const account = await Account.findOne({ where: { appSecretToken: secretToken } });
    if (!account) {
      return res.status(404).json({ error: 'Account not found' });
    }

    const data = req.body;
    if (!data || typeof data !== 'object') {
      return res.status(400).json({ error: 'Invalid Data' });
    }

    const destinations = await Destination.findAll({ where: { AccountAccountId: account.accountId } });

    for (const dest of destinations) {
      try {
        const method = dest.httpMethod.toUpperCase();

        if (method === 'GET') {
          await axios.get(dest.url, {
            headers: dest.headers,
            params: data,
          });
        } else if (method === 'POST' || method === 'PUT') {
          await axios({
            method,
            url: dest.url,
            headers: dest.headers,
            data,
          });
        } else {
          console.log(`Unsupported HTTP method: ${method}`);
        }
      } catch (err) {
        console.error(`Failed to send data to destination ${dest.url}:`, err.message);
      }
    }

    res.json({ message: 'Data forwarded to all destinations' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

