import axios from 'axios';
import jwt_decode from 'jwt-decode';

axios.defaults.baseURL = 'https://ib-spin.herokuapp.com/v1.0/api'

export const post = async (url, data, authorize = false) => {
    let config = {
        'Accept': 'application/json',
        ...(authorize && { 'Authorization': `Bearer ` + localStorage.getItem("token") }),
    };
    try {
        const res = await axios.post(url, data, { headers: config });
        return {
            status: res.status,
            data: res.data.data,
        };
    } catch (err) {
        console.log(`Error while posting to ${url}`);
        const message = err.response.data.error.message;
        return {
            status: err.response.status,
            data: message
        };
    }
}


export const get = async (url, authorize = false, headers = null) => {
    let config = {
        'Accept': 'application/json',
        ...(authorize && { 'Authorization': `Bearer ` + localStorage.getItem("token") }),
        ...headers
    };

    try {
        const res = await axios.get(url, { headers: config });
        return {
            status: res.status,
            data: res.data.data,
            result: res,
        };
    } catch (err) {
        console.log(`Error while fetching to ${url}`);
        const message = err.response.data.error.message;
        return {
            status: err.response.status,
            data: message
        };
    }
}

export const del = async (url, authorize = false, headers = null) => {
    let config = {
        'Accept': 'application/json',
        ...(authorize && { 'Authorization': `Bearer ` + localStorage.getItem("token") }),
        ...headers
    };

    try {
        const res = await axios.delete(url, { headers: config });
        return {
            status: res.status,
            data: res.data.data,
        };
    } catch (err) {
        console.log(`Error while fetching to ${url}`);
        const message = err.response.data.error.message;
        return {
            status: err.response.status,
            data: message
        };
    }
}

export const decodeToken = (token) => {
    try {
        const decoded = jwt_decode(token);
        return decoded
    } catch (err) {
        return false;
    }
};

export const isTokenValid = (token) => {
    try {
        const decoded = jwt_decode(token);
        var d = new Date();
        if (d.setDate(d.getDate()) >= decoded.exp * 1000) {
            localStorage.clear('token');
            return false;
        } else {
            return true;
        }
    } catch (err) {
        return false;
    }
};

export const setAuthToken = (token) => {
    if (token) {
        axios.defaults.headers.common.Authorization = `Bearer ${token}`;
    } else {
        delete axios.defaults.headers.common.Authorization;
    }
};
