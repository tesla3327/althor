const mongoose = require('mongoose');

const prospectSchema = mongoose.Schema({
  hostname: String,
}, { strict: false });

const Prospect = mongoose.model('Prospect', prospectSchema);

module.exports = Prospect;
