import http from "./httpServices";
import config from "../config.json";

const prefixUrl = `${config.api}category`

export const createCategory = (data) => {
    return http.post(`${prefixUrl}/createCategory`, JSON.stringify(data));
};
