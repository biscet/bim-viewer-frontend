import axios from 'axios';
import { API_LINK } from 'src/config/constants';

async function getAccesstoken() {
  return axios
    .get(`${API_LINK}api/forge/oauth/token`)
    .then((response) => response.data)
    .catch((error) => {
      // eslint-disable-next-line no-console
      console.log(error);
    });
}

const Client = { getAccesstoken };
export default Client;
