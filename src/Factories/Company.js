export default function({
  name,
  displayName,
  legalName,
  address = {},
  signupCode,
  employeeMin,
  employeeMax
} = {}) {
  //validation here
  return {
    name,
    displayName: name,
    legalName: legalName,
    address,
    signupCode,
    employeeMin,
    employeeMax,
    setAddress({ address1, address2, city, state, zip }) {
      this.address = {
        address1,
        address2,
        city,
        state,
        zip
      };
      return this;
    },
    getAddress() {
      return this.address || null;
    },
    setSignupCode({ code }) {
      this.signupCode = code;
      return this;
    },
    getSignupCode() {
      return this.signupCode;
    },
    setEmployeeRange({ min, max }) {
      this.employeeMin = min;
      this.employeeMax = max;
      return this;
    }
  };
}
