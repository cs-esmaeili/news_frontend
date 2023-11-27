import http from "./httpServices";
import config from "../config.json";

export const logIn = (data) => {
    return http.post(`${config.api}logIn`, JSON.stringify(data));
};

export const LogOut = (data) => {
    return http.post(`${config.api}logOut`, JSON.stringify(data));
};
export const CheckToken = () => {
    return http.post(`${config.api}checkToken`, {});
};
export const _ChangeData = (data) => {
    return http.post(`${config.api}changedata`, JSON.stringify(data), {
        headers: {
            "Action": "changeData",
        }
    });
};
