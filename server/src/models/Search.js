// Search.js — MongoDB schema for saved weather searches
const mongoose = require('mongoose');

const SearchSchema = new mongoose.Schema({
  // Location info
  location: {
    type: String,
    required: [true, 'Location is required'],
    trim: true,
  },
  country: { type: String },
  coordinates: {
    lat: { type: Number },
    lon: { type: Number },
  },

  // Date range (for historical queries)
  dateFrom: { type: Date },
  dateTo: { type: Date },

  // Weather data
  temperature: { type: Number },
  feelsLike: { type: Number },
  humidity: { type: Number },
  windSpeed: { type: Number },
  condition: { type: String },
  description: { type: String },
  icon: { type: String },
  pressure: { type: Number },
  visibility: { type: Number },
  sunrise: { type: Number },
  sunset: { type: Number },

  // User additions
  notes: { type: String, default: '' },
  label: { type: String, default: '' },

  // Timestamps
  searchedAt: { type: Date, default: Date.now },
}, { timestamps: true });

module.exports = mongoose.model('Search', SearchSchema);