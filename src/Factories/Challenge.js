const Challenge = {
  author: {
    type: 'string',
    defaultValue: '',
    form: { display: false }
  },
  participants: {
    type: 'object',
    defaultValue: {},
    form: { display: false }
  },
  description: {
    type: 'string',
    defaultValue: '',
    form: {
      display: true,
      position: 2
    }
  },
  name: {
    type: 'string',
    defaultValue: '',
    validation: val => val.length < 5,
    form: {
      display: true,
      position: 1
    }
  }
};

export default Challenge;
