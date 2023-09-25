import http from "./httpServices";
import config from "../config.json";

export const logIn = (data) => {
    return http.post(`${config.api_admin}logIn`, JSON.stringify(data));
};

export const LogOut = (data) => {
    return http.post(`${config.api_admin}logOut`, JSON.stringify(data));
};
export const CheckToken = () => {
    return http.post(`${config.api_admin}checkToken`, {});
};
export const _ChangeData = (data) => {
    return http.post(`${config.api_admin}changedata`, JSON.stringify(data), {
        headers: {
            "Action": "changeData",
        }
    });
};
