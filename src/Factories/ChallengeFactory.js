const toTitle = string => string[0].toUpperCase() + string.substring(1);

const measureTypes = {
  hours: {
    type: 'time'
  },
  minutes: {
    type: 'time'
  },
  steps: {
    type: 'count'
  },
  calories: {
    type: 'count'
  }
};

const coreDistance = ['miles', 'kilometers'];
const coreDuration = ['hours', 'minutes'];
const coreCount = ['calories'];

const gameActivities = {
  gamePlayed: {
    type: 'game',
    measures: {
      count: {
        options: ['win', 'play']
      }
    }
  }
};

const charityActivities = {
  itemDonation: {
    type: 'charity',
    measures: {
      count: {
        options: ['value', 'units']
      }
    }
  },
  volunteer: {
    type: 'charity',
    measures: {
      duration: {
        options: [...coreCount, 'days']
      }
    }
  }
};

const fitnessActivities = {
  run: {
    type: 'fitness',
    measures: {
      distance: {
        options: coreDistance
      },
      duration: {
        options: coreDuration
      },
      count: {
        options: [...coreCount, 'steps']
      }
    }
  },
  bike: {
    type: 'fitness',
    measures: {
      distance: {
        options: coreDistance
      },
      duration: {
        options: coreDuration
      },
      count: {
        options: [...coreCount]
      }
    }
  },
  walk: {
    type: 'fitness',
    measures: {
      distance: {
        options: coreDistance
      },
      duration: {
        options: coreDuration
      },
      count: {
        options: [...coreCount, 'steps']
      }
    }
  }
};

export const challengeSchema = {
  participantType: {
    options: ['individual', 'team']
  },
  winCondition: {
    type: {
      options: ['firstToGoal', 'goalAfterTime']
    },
    measure: {
      options: ['sum', 'average']
    }
  },
  goalType: {
    options: ['fitness', 'charity', 'game']
  },
  activities: {
    options: { ...fitnessActivities, ...charityActivities, ...gameActivities }
  }
};
