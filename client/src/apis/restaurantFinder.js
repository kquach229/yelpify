import axios from 'axios';

export default axios.create({
  baseURL: 'http://localhost:2022/api/v1/restaurants'
})