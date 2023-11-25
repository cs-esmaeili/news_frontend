import http from "./httpServices";
import config from "../config.json";

const prefixUrl = `${config.api_admin}file`

export const createPost = (data) => {
    return http.post(`${prefixUrl}/createPost`, JSON.stringify(data));
};
