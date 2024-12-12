// Dummy data for Audio Streaming Habits

export const AudioStreamingTimePerDay = {
  stats: {
    distribution: [
      { name: "0-30 mins", value: 20 },
      { name: "31-60 mins", value: 35 },
      { name: "61-120 mins", value: 25 },
      { name: "120+ mins", value: 20 },
    ],
  },
  title: "Total Time Spent/Day",
  description: "Shows average daily audio streaming time per user",
  options: {
    chartType: "bar",
  },
};

export const AudioStreamingDays = {
  stats: {
    distribution: [
      { name: "1-5 days", value: 30 },
      { name: "6-10 days", value: 25 },
      { name: "11-20 days", value: 25 },
      { name: "21+ days", value: 20 },
    ],
  },
  title: "Total Days Engaging",
  description: "Shows total number of days per month spent streaming",
  options: {
    chartType: "bar",
  },
};

export const AudioStreamingEvents = {
  stats: {
    distribution: [
      { name: "Low (1-10 events)", value: 40 },
      { name: "Medium (11-50 events)", value: 35 },
      { name: "High (51+ events)", value: 25 },
    ],
  },
  title: "Total Streaming Events",
  description: "Shows frequency of audio streaming events",
  options: {
    chartType: "bar",
  },
};

export const SpotifyListener = {
  stats: {
    distribution: [
      { name: "Listener", value: 55 },
      { name: "Non-Listener", value: 45 },
    ],
  },
  title: "Spotify Listener",
  description: "Indicates if user listened to Spotify",
  options: {
    chartType: "pie",
  },
};

export const YouTubeMusicListener = {
  stats: {
    distribution: [
      { name: "Listener", value: 48 },
      { name: "Non-Listener", value: 52 },
    ],
  },
  title: "YouTube Music Listener",
  description: "Indicates if user listened to YouTube Music",
  options: {
    chartType: "pie",
  },
};

export const PandoraMusicListener = {
  stats: {
    distribution: [
      { name: "Listener", value: 30 },
      { name: "Non-Listener", value: 70 },
    ],
  },
  title: "Pandora Listener",
  description: "Indicates if user listened to Pandora Music",
  options: {
    chartType: "pie",
  },
};

export const AmazonMusicListener = {
  stats: {
    distribution: [
      { name: "Listener", value: 20 },
      { name: "Non-Listener", value: 80 },
    ],
  },
  title: "Amazon Music Listener",
  description: "Indicates if user listened to Amazon Music",
  options: {
    chartType: "pie",
  },
};
