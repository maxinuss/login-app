import axios from "axios";

const UserService = {
  create: async function(email: string, password: string, name: string, lastName: string) {
    try {
      const result = await axios.post(`${process.env.REACT_APP_API_URL}/user`, { email, password, name, lastName });

      return result.data;
    } catch (e) {
      console.error('Create user: ', e);

      return false;
    }
  },
};

export default UserService;