const axios = require('axios');

async function decodeVIN(vin) {
  const url = `https://vpic.nhtsa.dot.gov/api/vehicles/decodevinvalues/${vin}?format=json`;

  try {
    const response = await axios.get(url);
    const data = response.data.Results[0];

    return {
      vin: vin,
      make: data.Make,
      model: data.Model,
      year: data.ModelYear,
      engine_model: data.EngineModel,
      engine_cylinders: data.EngineCylinders,
      fuel_type: data.FuelTypePrimary,
    };
  } catch (error) {
    throw new Error('Erreur lors de la récupération des données VIN');
  }
}

module.exports = { decodeVIN };
