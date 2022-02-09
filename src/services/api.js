import axios from 'axios';
import jwt_decode from 'jwt-decode';

const { REACT_APP_API_URL } = process.env;

axios.defaults.baseURL = `${REACT_APP_API_URL}/v1.0/api`;

export const post = async (url, data, authorize = false, headers = null) => {
    
    let config = {
        'Accept': 'application/json',
        ...headers
    };
    try {
        const res = await axios.post(url, data, { headers: config });
        return {
            status: res.status,
            data: res.data.data,
        };
    } catch (err) {
        console.log(`Error while posting to ${url}`);
        let message = err.isAxiosError ? err.message : err.response.data.error.message;
        return {
            status: err.response?.status,
            data: message
        };
    }
}


export const get = async (url, authorize = false, headers = null) => {
    
    let config = {
      Accept: "application/json",
      ...headers,
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
        let message = err.isAxiosError ? err.message : err.response.data.error.message;
        return {
            status: err.response?.status,
            data: message
        };
    }
}

export const del = async (url, authorize = false, headers = null) => {
    
    let config = {
        'Accept': 'application/json',
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
        let message = err.isAxiosError ? err.message : err.response.data.error.message;
        return {
            status: err.response?.status,
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
    
    if (!token) return false;
    try {
        const decoded = jwt_decode(token);
        var d = new Date();
        if (d.setDate(d.getDate()) >= decoded.exp * 1000) {
            document.cookie = "";
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

export const deleteCookie = (name) => {
    document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:01 GMT;path=/;";
};