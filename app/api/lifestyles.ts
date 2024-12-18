// app/api/lifestyles.ts
export const BargainHunters = {
  stats: {
    distribution: [
      { name: "Bargain Hunters", value: 45 },
      { name: "Non-Bargain Hunters", value: 55 },
    ],
  },
  title: "Bargain Hunters",
  description: "Shows the share of users who are identified as bargain hunters.",
  options: {
    chartType: "pie",
  },
} as const;

export const HeavyGamers = {
  stats: {
    distribution: [
      { name: "Heavy Gamers", value: 30 },
      { name: "Others", value: 70 },
    ],
  },
  title: "Heavy Gamers",
  description: "Shows the percentage of users who are heavy gamers.",
  options: {
    chartType: "pie",
  },
} as const;

export const HeavySocialMediaUsers = {
  stats: {
    distribution: [
      { name: "Heavy SM Users", value: 50 },
      { name: "Others", value: 50 },
    ],
  },
  title: "Heavy Social Media Users",
  description: "Shows the proportion of users heavily engaged on social media.",
  options: {
    chartType: "pie",
  },
} as const;

export const SelfImprovement = {
  stats: {
    distribution: [
      { name: "Interested in Self-Improvement", value: 40 },
      { name: "Not Interested", value: 60 },
    ],
  },
  title: "Self-Improvement",
  description: "Shows the share of users observed engaging in self-improvement content.",
  options: {
    chartType: "pie",
  },
} as const;

export const GreenLiving = {
  stats: {
    distribution: [
      { name: "Green Living Enthusiasts", value: 35 },
      { name: "Others", value: 65 },
    ],
  },
  title: "Green Living",
  description: "Shows the percentage of users focusing on green living behaviors.",
  options: {
    chartType: "pie",
  },
} as const;

export const NaturalFoods = {
  stats: {
    distribution: [
      { name: "Natural Foods Consumers", value: 42 },
      { name: "Others", value: 58 },
    ],
  },
  title: "Natural Foods",
  description: "Shows the share of users frequently consuming or searching natural foods.",
  options: {
    chartType: "pie",
  },
} as const;

export const PlanningAWedding = {
  stats: {
    distribution: [
      { name: "Planning a Wedding", value: 10 },
      { name: "Not Planning", value: 90 },
    ],
  },
  title: "Planning a Wedding",
  description: "Shows the proportion of users actively engaged in wedding-related behaviors.",
  options: {
    chartType: "pie",
  },
} as const;

export const NewBaby = {
  stats: {
    distribution: [
      { name: "New Baby Household", value: 8 },
      { name: "Others", value: 92 },
    ],
  },
  title: "New Baby",
  description: "Shows the share of users indicating a new baby in the household.",
  options: {
    chartType: "pie",
  },
} as const;
