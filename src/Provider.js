import React, { useEffect, useReducer, createContext } from "react";
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { isTokenValid, decodeToken, setAuthToken } from "./services/api";

export const AppContext = createContext();
let token = null;

const loadState = (token) => {
    const tokenData = decodeToken(token);
    return ({
        alerts: [],
        username: tokenData.email,
        isAdmin: tokenData.isAdmin === "1",
        isAuthenticated: isTokenValid(token),
        loading: false,
        error: null,
    });
}

const initialState = {
    alerts: [],
    username: null,
    isAdmin: false,
    isAuthenticated: false,
    loading: false,
    error: null,
};


export const setAlert = (dispatch, title, body, type, timeout = 2000) => {
    const id = uuidv4();
    dispatch({
        type: "ADD_ALERT",
        payload: {
            id, title, body, type, timeout,
        },
    });

    setTimeout(() => {
        dispatch({
            type: "REMOVE_ALERT",
            payload: {
                id
            },
        });
    }, timeout);
};

const AppReducer = (state, action) => {
    switch (action.type) {
        case "LOAD_USER":
            token = localStorage.getItem('token');
            setAuthToken(token);
            return { ...state, ...(loadState(token)) };

        case "LOGIN":
            token = action.payload;
            setAuthToken(token);
            localStorage.setItem('token', token);
            return { ...state, ...(loadState(token)) };

        // LOADER
        case "START_LOADING":
            return { ...state, loading: true };
        case "STOP_LOADING":
            return { ...state, loading: false };

        // ALERTS
        case "ADD_ALERT":
            return { ...state, alerts: [...state.alerts, action.payload] };

        case "REMOVE_ALERT":
            return { ...state, alerts: state.alerts.filter(alert => alert.id !== action.payload.id) };

        case "CLEAR_ALERTS":
            return { ...state, alerts: [] };

        case "LOGOUT":
            delete axios.defaults.headers.common.Authorization;
            return {
                isAuthenticated: false,
                alerts: [],
                isAdmin: false,
                username: null,
                error: null,
                loading: null,
            };

        default:
            throw new Error();
    }
};


export function AppProvider(props) {
    const [state, dispatch] = useReducer(AppReducer, initialState);

    useEffect(() => {
        dispatch({ type: "LOAD_USER" });
    }, []);

    return (
        <AppContext.Provider value={[state, dispatch]}>
            {props.children}
        </AppContext.Provider>
    );
}