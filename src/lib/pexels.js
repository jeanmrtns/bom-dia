const { createClient } = require('pexels');

const pexels = createClient(process.env.PEXELS_API_KEY || "");

module.exports = pexels
