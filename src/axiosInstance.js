import axios from 'axios';


const instance = axios.create({
  baseURL:
    process.env.NODE_ENV === 'production'
      ? 'https://medhouse-backend.onrender.com'
      : 'http://localhost:8080', 
  withCredentials: true,
});

export default instance;