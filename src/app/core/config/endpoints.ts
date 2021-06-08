import { environment } from 'src/environments/environment';

export const endpoints = {
  login: {
    process: 'Logging In',
    url: environment.baseUrl + 'api/auth/login',
  },
  signup: {
    process: 'Signing Up',
    url: environment.baseUrl + 'api/auth/signup',
  },
  verify: {
    process: 'Verifying',
    url: environment.baseUrl + 'api/auth/verify',
  },
  search_user: {
    process: 'Searching Users',
    url: environment.baseUrl + 'api/user/search_user',
  },
};
