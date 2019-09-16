'use strict';

const axios = require('axios');

const baseURL = 'http://www.mocky.io/v2/';

module.exports = {
  getUsers: async () => {
    try {
      const result = await axios.get(baseURL + '5808862710000087232b75ac');
      return result.data.clients;
    } catch (error) {
      console.log(error);
    }
  },
  getPolicies: async (userId) => {
    try {
      const allPolicies = await axios.get(baseURL + '580891a4100000e8242b75c5');
      return allPolicies.data.policies.filter(policy => policy.clientId === userId);
    } catch (error) {
      console.log(error);
    }
  }
};
