import axios from "axios";

const AuthService = {
  login: async function(email: string, password: string) {
    try {
      const result = await axios.post(`${process.env.REACT_APP_API_URL}/user/login`, { email, password }, { withCredentials: true});

      return result.data;
    } catch (e) {
      console.error('Login: ', e);

      return false;
    }
  },
  logout: async function() {
    try {
      const result = await axios.get(`${process.env.REACT_APP_API_URL}/user/logout`, { withCredentials: true});
      console.log('logout: ', result);

      return result.data;
    } catch (e) {
      console.error('Logout: ', e);

      return false;
    }
  },
};

export default AuthService;