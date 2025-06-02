
const Account = require('../models/account');
const generateToken = require('../utils/generateToken');

exports.createAccount = async (req, res) => {
  try {
    const { email, accountName, website } = req.body;
    const newAccount = await Account.create({
      email,
      accountName,
      website,
      appSecretToken: generateToken()
    });
    res.status(201).json(newAccount);
       console.log("Account Created Successfully!: ",newAccount);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAccount = async (req, res) => {
  try {
    const account = await Account.findOne({ where: { accountId: req.params.id } });
    if (!account) return res.status(404).json({ error: 'Account not found' });
    res.json(account);
    console.log("Account : ",account);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateAccount = async (req, res) => {
  try {
    const account = await Account.findOne({ where: { accountId: req.params.id } });
    if (!account) return res.status(404).json({ error: 'Account not found' });
    await account.update(req.body);
    res.json(account);
    console.log("Account Updated Successfully!: ",account);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteAccount = async (req, res) => {
  try {
    const account = await Account.findOne({ where: { accountId: req.params.id } });
    if (!account) return res.status(404).json({ error: 'Account not found' });
    await account.destroy();
    res.json({ message: 'Account and its destinations deleted' });
    console.log("Account Deleted Successfully!: ",account);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
