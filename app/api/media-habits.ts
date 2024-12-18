// app/api/media-habits.ts

// Since the question only provides a set of variables, we create placeholder data.
// Variables A-X represent each metric. For simplicity, we’ll just show simple data (Yes/No or numeric).

export const TotalMinutesSpent = {
  stats: {
    distribution: [
      { name: "0-30 mins", value: 20 },
      { name: "31-60 mins", value: 35 },
      { name: "61-120 mins", value: 25 },
      { name: "120+ mins", value: 20 },
    ],
  },
  title: "Total Minutes Spent (All Media)",
  description: "Shows distribution of total minutes spent on media/streaming per day.",
  options: {
    chartType: "bar",
  },
} as const;

export const TotalDaysEngaging = {
  stats: {
    distribution: [
      { name: "1-5 days", value: 30 },
      { name: "6-10 days", value: 25 },
      { name: "11-20 days", value: 25 },
      { name: "21+ days", value: 20 },
    ],
  },
  title: "Total Days Engaging (Month)",
  description: "Shows how many days per month users engage with media/streaming.",
  options: {
    chartType: "bar",
  },
} as const;

// For Yes/No variables, we can do simple pie charts
function yesNoChart(title: string, description: string) {
  return {
    stats: {
      distribution: [
        { name: "Yes", value: 50 },
        { name: "No", value: 50 },
      ],
    },
    title,
    description,
    options: {
      chartType: "pie",
    },
  } as const;
}

// Streaming services (Yes/No)
export const NetflixUser = yesNoChart(
  "Netflix User",
  "Shows the percentage of users who used Netflix in the past month."
);

export const AmazonPrimeUser = yesNoChart(
  "Amazon Prime User",
  "Shows the percentage of users who used Amazon Prime in the past month."
);

export const HuluUser = yesNoChart("Hulu User", "Shows the percentage of users who used Hulu in the past month.");

export const TubiUser = yesNoChart("Tubi User", "Shows the percentage of users who used Tubi in the past month.");

export const DisneyPlusUser = yesNoChart(
  "Disney+ User",
  "Shows the percentage of users who used Disney+ in the past month."
);

export const PlutoUser = yesNoChart("Pluto User", "Shows the percentage of users who used Pluto in the past month.");

export const ParamountUser = yesNoChart(
  "Paramount User",
  "Shows the percentage of users who used Paramount in the past month."
);

export const HBOMaxUser = yesNoChart(
  "HBO Max User",
  "Shows the percentage of users who used HBO Max in the past month."
);

export const PeacockUser = yesNoChart(
  "Peacock User",
  "Shows the percentage of users who used Peacock in the past month."
);

export const YouTubeTVUser = yesNoChart(
  "YouTube TV User",
  "Shows the percentage of users who used YouTube TV in the past month."
);

export const YouTubeUser = yesNoChart(
  "YouTube User",
  "Shows the percentage of users who used YouTube in the past month."
);

// For total minutes spent per service, we'll use a bar chart distribution again
function serviceMinutesChart(title: string) {
  return {
    stats: {
      distribution: [
        { name: "0-30 mins", value: 20 },
        { name: "31-60 mins", value: 30 },
        { name: "61-120 mins", value: 25 },
        { name: "120+ mins", value: 25 },
      ],
    },
    title,
    description: `Shows distribution of total minutes spent on ${title} in the past month.`,
    options: {
      chartType: "bar",
    },
  } as const;
}

export const NetflixMinutes = serviceMinutesChart("Netflix");
export const AmazonPrimeMinutes = serviceMinutesChart("Amazon Prime");
export const HuluMinutes = serviceMinutesChart("Hulu");
export const TubiMinutes = serviceMinutesChart("Tubi");
export const DisneyPlusMinutes = serviceMinutesChart("Disney+");
export const PlutoMinutes = serviceMinutesChart("Pluto");
export const ParamountMinutes = serviceMinutesChart("Paramount");
export const HBOMaxMinutes = serviceMinutesChart("HBO Max");
export const PeacockMinutes = serviceMinutesChart("Peacock");
export const YouTubeTVMinutes = serviceMinutesChart("YouTube TV");
export const YouTubeMinutes = serviceMinutesChart("YouTube");
