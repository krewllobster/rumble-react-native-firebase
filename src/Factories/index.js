import CreateFactory from './CreateFactory';
import challengeModel from './Challenge';
import companyModel from './Company';

export const Challenge = CreateFactory(challengeModel);
export const Company = CreateFactory(companyModel);

export default {
  Challenge,
  Company
};
