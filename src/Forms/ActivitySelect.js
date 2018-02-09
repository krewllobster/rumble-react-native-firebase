//TODO: Calorie ratios
const hours = { label: 'Hours', value: 'hour', measureType: 'duration' };
const minutes = { label: 'Minutes', value: 'minute', measureType: 'duration' };
const steps = { label: 'Steps', value: 'step', measureType: 'count' };
const miles = { label: 'Miles', value: 'mile', measureType: 'count' };
const calories = { label: 'Calories', value: 'calorie', measureType: 'count' };
const item = { label: 'Item', value: 'item', measureType: 'count' };
const cans = { label: 'Cans', value: 'can', measureType: 'count' };
const value = { label: 'Value', value: 'value', measureType: 'count' };
const laps = { label: '50 Yard Laps', value: 'laps', measureType: 'count' };

const makeActivity = (activity, activityType, measures) => {
  return measures.map(m => ({ ...m, activity, activityType }));
};

const activitySelect = [
  ...makeActivity('hike', 'fitness', [hours, minutes, steps, miles, calories]),
  ...makeActivity('walk', 'fitness', [hours, minutes, steps, miles, calories]),
  ...makeActivity('swim', 'fitness', [hours, minutes, laps, miles, calories]),
  ...makeActivity('run', 'fitness', [hours, minutes, steps, miles, calories]),
  ...makeActivity('donation', 'charity', [item, cans, value]),
  ...makeActivity('voluneer', 'charity', [hours])
];

export const listActivitySelect = {
  walk: [
    ...makeActivity('walk', 'fitness', [hours, minutes, steps, miles, calories])
  ],
  run: [
    ...makeActivity('run', 'fitness', [hours, minutes, steps, miles, calories])
  ],
  swim: [...makeActivity('swim', 'fitness', [hours, minutes, miles, calories])],
  hike: [
    ...makeActivity('hike', 'fitness', [hours, minutes, steps, miles, calories])
  ],
  donation: [...makeActivity('donation', 'charity', [item, cans, value])],
  volunteer: [...makeActivity('voluneer', 'charity', [hours])]
};

export default activitySelect;
