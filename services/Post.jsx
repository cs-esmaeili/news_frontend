import http from "./httpServices";
import config from "../config.json";

const prefixUrl = `${config.api}post`

export const createPost = (data) => {
    return http.post(`${prefixUrl}/createPost`, JSON.stringify(data));
};
