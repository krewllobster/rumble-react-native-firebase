const Challenge = {
  author: {
    type: 'string',
    defaultValue: '',
    form: false
  },
  participants: {
    type: 'object',
    defaultValue: {},
    form: false
  },
  name: {
    type: 'string',
    defaultValue: '',
    validation: val => val.length < 5,
    form: true
  }
};

export default Challenge;
