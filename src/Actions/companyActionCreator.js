import { SetActiveCompany } from './actionTypes';

export const setActiveCompany = id => ({
  type: SetActiveCompany,
  companyId: id
});

export default {
  setActiveCompany
};
