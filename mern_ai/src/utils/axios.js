import axios from "axios";
const instance = axios.create({
    baseURL: "https://ai-resume-backend.onrender.com",
})
export default instance;