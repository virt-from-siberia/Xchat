import axios from "axios";

axios.defaults.baseURL = window.location.origin;
// axios.defaults.headers.common["Authorization"] = AUTH_TOKEN;

window.axios = axios;

export default axios;
