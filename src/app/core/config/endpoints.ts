import { environment } from 'src/environments/environment';

export const endpoints = {
  login: {
    process: 'Logging In',
    url: environment.baseUrl + 'api/auth/login',
    timeout: 5000,
    error: 'Login Failed',
  },
  signup: {
    process: 'Signing Up',
    url: environment.baseUrl + 'api/auth/signup',
    timeout: 5000,
    error: 'Signup Failed',
  },
  verify: {
    process: 'Verifying',
    url: environment.baseUrl + 'api/auth/verify',
    timeout: 5000,
    error: 'Verification Failed',
  },
};
