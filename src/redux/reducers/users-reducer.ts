import { Dispatch } from "redux";
import { getAuth, login, logout, registrateBuyer, registrateConfectioners, sendCode } from "../../api/users";

const SET_USER = "SET-USER/users";
const SET_EMAIL = "SET-EMAIL/users";
const SET_TYPE = "SET-TYPE/users";
const SET_STATUS = "SET-STATUS/users";

export interface User {
    id?: string;
    name?: string;
    email: string;
    reportArray?: string[];
    numberReport?: number;
    addresses?: Record<string, { key: string; isConfirm: boolean }>;
    isConfirm?: boolean;
}

export interface UsersState {
    user: User | null;
    activeEmail: string | null;
    typeReg: "confectioners" | "buyer" | null;
    status: boolean;
}

const initialState: UsersState = {
    user: null,
    activeEmail: null,
    typeReg: null,
    status: false
};

const usersReducer = (state = initialState, action: any): UsersState => {
    switch(action.type) {
        case SET_USER:
            return {
                ...state,
                user: action.data
            };
        case SET_EMAIL:
            return {
                ...state,
                activeEmail: action.email
            };
        case SET_TYPE:
            return {
                ...state,
                typeReg: action.typeReg
            };
        case SET_STATUS:
            return {
                ...state,
                status: action.status
            };
        default:
            return state;
    }
};

export const setUser = (data: User | null) => ({type: SET_USER, data});
export const setEmail = (email: string) => ({type: SET_EMAIL, email});
export const setType = (typeReg: string) => ({type: SET_TYPE, typeReg});
export const setStatus = (status: boolean) => ({type: SET_STATUS, status});

export const registrateUserThunkCreator = (user: User, type: "confectioners" | "buyer") => async (dispatch: Dispatch) => {
    if (type == "buyer") {
        registrateBuyer(user.email, user.name ?? "");
    } else {
        registrateConfectioners(user.email, user.name ?? "");
    }
};

export const loginUserThunkCreator = (user: User) => async (dispatch: Dispatch) => {
    login(user.email);
};

export const sendCodeUserThunkCreator = (code: string, email: string) => async (dispatch: Dispatch) => {
    const result = await sendCode(code, email);

    if(result) {
        dispatch(setUser(result));
    }
};

export const getAuthThunkCreator = () => async (dispatch: Dispatch) => {
    const result = await getAuth();

    if (result) {
        await dispatch(setUser(result));
    }

    dispatch(setStatus(true));
};

export const logoutThunkCreator = () => async (dispatch: Dispatch) => {
    const result = await logout();

    if (result) {
        dispatch(setUser(null));
    }
};

export default usersReducer;