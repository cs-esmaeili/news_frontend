import http from "./httpServices";
import config from "../config.json";

const prefixUrl = `${config.api_admin}file`

export const folderFileList = (data) => {
    return http.post(`${prefixUrl}/folderFileList`, JSON.stringify(data));
};

export const deleteFolder = (data) => {
    return http.post(`${prefixUrl}/deleteFolder`, JSON.stringify(data));
};

