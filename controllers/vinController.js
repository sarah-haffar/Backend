const { decodeVIN } = require('../services/vinDecoder');

async function getVehicleInfo(req, res) {
  const vin = req.params.vin.toUpperCase();

  if (vin.length !== 17) {
    return res.status(400).json({ error: 'VIN invalide (17 caractères requis)' });
  }

  try {
    const data = await decodeVIN(vin);
    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}

module.exports = { getVehicleInfo };
