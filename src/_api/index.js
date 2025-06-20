import axios from "axios";
const url = "http://127.0.0.1:8000"
// const url = "https://akmal-bc.karyakreasi.id/api"


const API = axios.create({
  baseURL: `${url}/api`
})

API.interceptors.request.use(config => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  } else {
    delete config.headers.Authorization; // pastikan tidak kirim Bearer null
  }
  return config;
});


export const bookImageStorage = `${url}/storage/books`;

export default API;