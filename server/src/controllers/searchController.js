// searchController.js — All CRUD logic lives here
const Search = require('../models/Search');
const axios = require('axios');

// ─── CREATE ───────────────────────────────────────────────
// POST /api/searches
// Save a new weather search to the database
exports.createSearch = async (req, res) => {
  try {
    const {
      location, country, coordinates,
      dateFrom, dateTo,
      temperature, feelsLike, humidity, windSpeed,
      condition, description, icon, pressure, visibility,
      sunrise, sunset, notes, label,
    } = req.body;

    // Validate location
    if (!location) {
      return res.status(400).json({ success: false, message: 'Location is required' });
    }

    // Validate date range if provided
    if (dateFrom && dateTo) {
      if (new Date(dateFrom) > new Date(dateTo)) {
        return res.status(400).json({
          success: false,
          message: 'Start date cannot be after end date'
        });
      }
    }

    const search = await Search.create({
      location, country, coordinates,
      dateFrom, dateTo,
      temperature, feelsLike, humidity, windSpeed,
      condition, description, icon, pressure, visibility,
      sunrise, sunset, notes, label,
    });

    res.status(201).json({ success: true, data: search });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ─── READ ALL ─────────────────────────────────────────────
// GET /api/searches
exports.getAllSearches = async (req, res) => {
  try {
    const searches = await Search.find().sort({ searchedAt: -1 });
    res.status(200).json({ success: true, count: searches.length, data: searches });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ─── READ ONE ─────────────────────────────────────────────
// GET /api/searches/:id
exports.getSearchById = async (req, res) => {
  try {
    const search = await Search.findById(req.params.id);
    if (!search) {
      return res.status(404).json({ success: false, message: 'Search not found' });
    }
    res.status(200).json({ success: true, data: search });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ─── UPDATE ───────────────────────────────────────────────
// PUT /api/searches/:id
exports.updateSearch = async (req, res) => {
  try {
    const { notes, label, dateFrom, dateTo } = req.body;

    // Validate dates if updating
    if (dateFrom && dateTo && new Date(dateFrom) > new Date(dateTo)) {
      return res.status(400).json({
        success: false,
        message: 'Start date cannot be after end date'
      });
    }

    const search = await Search.findByIdAndUpdate(
      req.params.id,
      { notes, label, dateFrom, dateTo },
      { new: true, runValidators: true }
    );

    if (!search) {
      return res.status(404).json({ success: false, message: 'Search not found' });
    }

    res.status(200).json({ success: true, data: search });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ─── DELETE ───────────────────────────────────────────────
// DELETE /api/searches/:id
exports.deleteSearch = async (req, res) => {
  try {
    const search = await Search.findByIdAndDelete(req.params.id);
    if (!search) {
      return res.status(404).json({ success: false, message: 'Search not found' });
    }
    res.status(200).json({ success: true, message: 'Search deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ─── EXPORT ───────────────────────────────────────────────
// GET /api/searches/export?format=csv|json|pdf
exports.exportSearches = async (req, res) => {
  try {
    const { format } = req.query;
    const searches = await Search.find().sort({ searchedAt: -1 });

    if (format === 'json') {
      res.setHeader('Content-Disposition', 'attachment; filename=weather-searches.json');
      res.setHeader('Content-Type', 'application/json');
      return res.status(200).json(searches);
    }

    if (format === 'csv') {
      const headers = ['Location','Country','Temperature(C)','Humidity(%)','WindSpeed(m/s)','Condition','Notes','Label','SearchedAt'];
      const rows = searches.map(s => [
        s.location, s.country, s.temperature, s.humidity,
        s.windSpeed, s.condition, s.notes, s.label,
        new Date(s.searchedAt).toLocaleString()
      ]);
      const csv = [headers, ...rows].map(r => r.join(',')).join('\n');
      res.setHeader('Content-Disposition', 'attachment; filename=weather-searches.csv');
      res.setHeader('Content-Type', 'text/csv');
      return res.send(csv);
    }

    if (format === 'markdown') {
      let md = '# Weather Searches\n\n';
      md += '| Location | Temp | Humidity | Condition | Date |\n';
      md += '|----------|------|----------|-----------|------|\n';
      searches.forEach(s => {
        md += `| ${s.location} | ${s.temperature}°C | ${s.humidity}% | ${s.condition} | ${new Date(s.searchedAt).toLocaleDateString()} |\n`;
      });
      res.setHeader('Content-Disposition', 'attachment; filename=weather-searches.md');
      res.setHeader('Content-Type', 'text/markdown');
      return res.send(md);
    }

    res.status(400).json({ success: false, message: 'Invalid format. Use: json, csv, markdown' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ─── YOUTUBE VIDEOS ───────────────────────────────────────
// GET /api/youtube?location=London
exports.getYoutubeVideos = async (req, res) => {
  try {
    const { location } = req.query;
    const API_KEY = process.env.YOUTUBE_API_KEY;
    const response = await axios.get('https://www.googleapis.com/youtube/v3/search', {
      params: {
        part: 'snippet', q: `${location} travel weather`,
        key: API_KEY, maxResults: 3, type: 'video',
      }
    });
    res.status(200).json({ success: true, data: response.data.items });
  } catch (error) {
    res.status(500).json({ success: false, message: 'YouTube API error' });
  }
};