const hours = { label: 'Hours', value: 'hour', type: 'duration' };
const minutes = { label: 'Minutes', value: 'minute', type: 'duration' };
const steps = { label: 'Steps', value: 'step', type: 'count' };
const miles = { label: 'Miles', value: 'mile', type: 'count' };
const calories = { label: 'Calories', value: 'calorie', type: 'count' };
const item = { label: 'Item', value: 'item', type: 'count' };
const cans = { label: 'Cans', value: 'can', type: 'count' };
const value = { label: 'Value', value: 'value', type: 'count' };

const activitySelect = {
  walk: {
    type: 'fitness',
    measures: [hours, minutes, steps, miles, calories]
  },
  swim: {
    type: 'fitness',
    measures: [hours, minutes, miles, calories]
  },
  run: {
    type: 'fitness',
    measures: [hours, minutes, steps, miles, calories]
  },
  donation: {
    type: 'charity',
    measures: [item, cans, value]
  },
  volunteer: {
    type: 'charity',
    measures: [hours]
  }
};

export default activitySelect;
