const mongoose = require('mongoose');

const prospectSchema = mongoose.Schema({
  hostname: String,
});

const Prospect = mongoose.model('Prospect', prospectSchema);

module.exports = Prospect;
