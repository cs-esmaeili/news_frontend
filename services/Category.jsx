import http from "./httpServices";
import config from "../config.json";

const prefixUrl = `${config.api_admin}category`

export const createCategory = (data) => {
    return http.post(`${prefixUrl}/createCategory`, JSON.stringify(data));
};
