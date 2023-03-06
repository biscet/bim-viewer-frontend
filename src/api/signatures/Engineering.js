import axios from 'axios';
import { API_LINK } from 'src/config/constants';

export const getBucketsSign = () => axios.get(`${API_LINK}api/forge/oss/buckets`);

export const postBucketSign = (data) => axios.post(`${API_LINK}api/forge/oss/buckets`, data);

export const deleteBucketSign = (data) => axios.post(`${API_LINK}api/forge/oss/buckets/delete`, data);

export const deleteObjectSign = (data) => axios.post(`${API_LINK}api/forge/oss/items/delete`, data);

export const postModelSign = ({ data }) => axios.post(`${API_LINK}api/forge/oss/objects`, data);

export const postTranslationSign = (id) => axios.post(
  `${API_LINK}api/forge/modelderivative/translate`, id,
);
