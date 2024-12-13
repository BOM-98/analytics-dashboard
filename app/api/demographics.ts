export const Genders = {
  stats: {
    distribution: [
      { name: "Female", value: 52 },
      { name: "Male", value: 47 },
      { name: "Other", value: 1 },
    ],
  },
  title: "Gender Distribution",
  description: "This chart shows the percentage breakdown of users by gender.",
  options: {
    chartType: "pie",
  },
} as const;

export const AgeCohorts = {
  stats: {
    distribution: [
      { name: "18-24", value: 15 },
      { name: "25-34", value: 25 },
      { name: "35-44", value: 22 },
      { name: "45-54", value: 18 },
      { name: "55-64", value: 12 },
      { name: "65+", value: 8 },
    ],
  },
  title: "Age Distribution",
  description: "This chart shows the distribution of users across different age groups.",
  options: {
    chartType: "bar",
  },
} as const;

export const Regions = {
  stats: {
    distribution: [
      { name: "South", value: 38 },
      { name: "Midwest", value: 21 },
      { name: "West", value: 24 },
      { name: "Northeast", value: 17 },
    ],
  },
  title: "Regional Distribution",
  description: "This chart shows the percentage of users from different US regions.",
  options: {
    chartType: "pie",
  },
} as const;

export const Education = {
  stats: {
    distribution: [
      { name: "No schooling completed", value: 2 },
      { name: "Nursery school to 8th grade", value: 5 },
      { name: "Some high school, no diploma", value: 8 },
      { name: "High school graduate", value: 22 },
      { name: "Some college credit, no degree", value: 18 },
      { name: "Trade/technical/vocational training", value: 12 },
      { name: "Associate degree", value: 10 },
      { name: "Bachelor's degree", value: 15 },
      { name: "Master's degree", value: 5 },
      { name: "Professional degree", value: 2 },
      { name: "Doctorate degree", value: 1 },
    ],
  },
  title: "Education Levels",
  description: "This chart shows the educational background of the user base.",
  options: {
    chartType: "bar",
  },
} as const;

export const KidsInHousehold = {
  stats: {
    distribution: [
      { name: "None", value: 40 },
      { name: "1 child", value: 25 },
      { name: "2 children", value: 20 },
      { name: "3 children", value: 10 },
      { name: "4 children", value: 3 },
      { name: "5+ children", value: 2 },
    ],
  },
  title: "Children in Household",
  description: "This chart shows how many children are typically found in a user’s household.",
  options: {
    chartType: "bar",
  },
} as const;

export const Ethnicity = {
  stats: {
    distribution: [
      { name: "White/Caucasian", value: 60 },
      { name: "Black/African American", value: 13 },
      { name: "Asian/Pacific Islander", value: 6 },
      { name: "American Indian/Alaska Native", value: 2 },
      { name: "Other/Multi-racial", value: 19 },
    ],
  },
  title: "Ethnic Composition",
  description: "This chart shows the ethnic makeup of the user population.",
  options: {
    chartType: "bar",
  },
} as const;

export const Hispanic = {
  stats: {
    distribution: [
      { name: "Hispanic", value: 35 },
      { name: "Non-Hispanic", value: 65 },
    ],
  },
  title: "Hispanic Origin",
  description: "This chart shows the share of users who are of Hispanic origin.",
  options: {
    chartType: "pie",
  },
} as const;
