// Heatmap intensity data points for Mumbai
// Based on historical flood-prone areas, terrain elevation, and drainage capacity
// Format: [latitude, longitude, intensity (0-1)]

export const heatmapPoints = [
  // Kurla West — Critical flood zone (Mithi River basin)
  [19.075, 72.884, 0.95],
  [19.078, 72.889, 0.92],
  [19.073, 72.886, 0.88],
  [19.080, 72.882, 0.85],
  [19.076, 72.891, 0.90],

  // Dharavi — Dense settlement, poor drainage
  [19.042, 72.855, 0.93],
  [19.044, 72.858, 0.90],
  [19.040, 72.852, 0.87],
  [19.046, 72.860, 0.85],
  [19.038, 72.856, 0.82],

  // Hindmata Junction — Notorious flood spot
  [19.012, 72.843, 0.97],
  [19.014, 72.845, 0.94],
  [19.010, 72.841, 0.91],

  // Sion — King Circle underpass flooding
  [19.047, 72.865, 0.72],
  [19.045, 72.868, 0.68],
  [19.049, 72.862, 0.65],

  // Milan Subway — Chronic waterlogging
  [19.099, 72.840, 0.88],
  [19.101, 72.842, 0.85],

  // Andheri East — Subway and low-lying areas
  [19.115, 72.875, 0.78],
  [19.118, 72.878, 0.75],
  [19.112, 72.872, 0.72],
  [19.120, 72.880, 0.70],

  // Chembur — Mahul Creek vicinity
  [19.058, 72.900, 0.74],
  [19.055, 72.903, 0.70],
  [19.062, 72.898, 0.68],

  // Mahalaxmi — Low-lying terrain near racecourse
  [18.983, 72.822, 0.82],
  [18.985, 72.825, 0.78],
  [18.981, 72.820, 0.75],

  // Dadar — TT Circle and surroundings
  [19.018, 72.842, 0.77],
  [19.020, 72.845, 0.73],
  [19.016, 72.840, 0.70],

  // Worli — Coastal flooding and storm surge risk
  [19.010, 72.815, 0.68],
  [19.012, 72.818, 0.65],
  [19.008, 72.812, 0.62],

  // Parel — Low elevation near railway line
  [19.005, 72.838, 0.73],
  [19.007, 72.840, 0.70],
  [19.003, 72.836, 0.67],

  // Malad — Malad Creek and west side
  [19.186, 72.848, 0.65],
  [19.188, 72.850, 0.62],
  [19.184, 72.846, 0.60],

  // Goregaon — Aarey Colony edge
  [19.162, 72.855, 0.55],
  [19.164, 72.858, 0.52],
  [19.160, 72.852, 0.50],

  // Borivali — National Park periphery
  [19.230, 72.860, 0.45],
  [19.232, 72.862, 0.42],

  // Mankhurd — Marshland flooding
  [19.048, 72.925, 0.72],
  [19.050, 72.928, 0.68],
  [19.046, 72.922, 0.65],

  // Bandra East — Mahim Creek
  [19.062, 72.845, 0.55],
  [19.060, 72.848, 0.52],

  // Powai — Powai Lake overflow zone
  [19.125, 72.905, 0.48],
  [19.127, 72.908, 0.45],

  // Vikhroli — Godrej Creek area
  [19.110, 72.930, 0.58],
  [19.112, 72.932, 0.55],

  // Ghatkopar — Railway underpass
  [19.087, 72.908, 0.67],
  [19.089, 72.910, 0.64],

  // Wadala — Salt pans low area
  [19.020, 72.865, 0.63],
  [19.022, 72.868, 0.60],

  // Colaba — Coastal surge exposure
  [18.907, 72.815, 0.42],
  [18.909, 72.818, 0.40],

  // Santacruz — Airport vicinity drainage issues
  [19.095, 72.855, 0.58],
  [19.097, 72.858, 0.55],
];

// Heatmap configuration
export const heatmapConfig = {
  radius: 25,
  blur: 20,
  maxZoom: 16,
  max: 1.0,
  minOpacity: 0.3,
  gradient: {
    0.0: '#00ff00',
    0.25: '#80ff00',
    0.4: '#ffff00',
    0.6: '#ffa500',
    0.8: '#ff4500',
    1.0: '#ff0000',
  },
};
