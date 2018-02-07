export const challengeModel = {
  challengeType: {
    label: 'Challenge Type',
    type: 'picker',
    options: [
      { label: 'Fitness', value: 'fitness' },
      { label: 'Charity', value: 'charity' },
      { label: 'Game', value: 'game' }
    ]
  },
  participantType: {
    label: 'Participant Type',
    type: 'picker',
    options: [
      { label: 'Individual', value: 'individual' },
      { label: 'Team', value: 'team' }
    ]
  },
  winConditionType: {
    label: 'Win Condition',
    type: 'picker',
    options: [
      { label: 'First to Goal', value: 'firstToGoal' },
      { label: 'Goal over Time', value: 'goalOverTime' }
    ]
  },
  winConditionMeasure: {
    label: 'Goal Measure',
    type: 'picker',
    options: [
      { label: 'Total Sum', value: 'sum' },
      { label: 'Average', value: 'average' }
    ]
  },
  goalMeasureType: {
    label: 'Goal Type',
    type: 'picker',
    options: [
      { label: 'Duration', value: 'duration' },
      { label: 'Count', value: 'count' }
    ]
  }
};
