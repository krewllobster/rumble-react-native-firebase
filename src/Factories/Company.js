const Company = {
  name: {
    type: 'string',
    default: ''
  },
  displayName: { type: 'string', default: '' },
  legalName: { type: 'string' },
  address: {
    type: 'object',
    default: {
      address1: '',
      address2: '',
      city: '',
      state: '',
      zip: ''
    }
  },
  signupCode: { type: 'string' },
  employeeMin: { type: 'number' },
  employeeMax: { type: 'number' }
};

export default Company;
