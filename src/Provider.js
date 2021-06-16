import React, { useReducer, createContext } from "react";
import { v4 as uuidv4 } from 'uuid';
import { isTokenValid, decodeToken } from "./services/api";

export const AppContext = createContext();
const token = localStorage.getItem('token');

const tokenData = decodeToken(token);


const initialState = {
    alerts: [],
    username: tokenData?.email,
    isAdmin: !!(tokenData?.isAdmin),
    isAuthenticated: isTokenValid(token),
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

        case "LOGIN":
            return { ...state, isAuthenticated: true };

        case "LOGOUT":
            return { ...initialState, isAuthenticated: false };

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

        default:
            throw new Error();
    }
};


export function AppProvider(props) {
    const [state, dispatch] = useReducer(AppReducer, initialState);

    return (
        <AppContext.Provider value={[state, dispatch]}>
            {props.children}
        </AppContext.Provider>
    );
}