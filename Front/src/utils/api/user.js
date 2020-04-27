import { axios } from "../../core";

export default {
    login: (postData) => axios.post("/user/login", postData),
    getMe: (token) =>
        axios.get("/user/me", {
            headers: {
                token: token,
            },
        }),
};
