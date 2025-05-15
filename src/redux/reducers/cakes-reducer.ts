import { Dispatch } from "redux";
import { createCake, getCake, getCakes } from "../../api/cakes";

const SET_CAKES = "SET-CAKES/cakes";
const SET_CAKE = "SET-CAKE/cakes";

export interface Cake {
    name?: string,
    photos?: [string],
    description?: string,
    status?: boolean,
    price?: number,
    tags?: [string],
    weight?: number,
    filling?: [string],
    additional_services?: [string],
    min_weight?: number,
    max_weight?: number
}

export interface CakesState {
    cakes: Cake | null;
    activeCake: Cake | null
}

const initialState: CakesState = {
    cakes: null,
    activeCake: null
};

const cakesReducer = (state = initialState, action: any): CakesState => {
    switch(action.type) {
        case SET_CAKES:
            return {
                ...state,
                cakes: action.data
            };
        case SET_CAKE:
            return {
                ...state,
                activeCake: action.data
            };
        default:
            return state;
    }
};

export const setCakes = (data: Cake | null) => ({type: SET_CAKES, data});
export const setCake = (data: Cake | null) => ({type: SET_CAKE, data});

export const getCakesThunkCreator = () => async (dispatch: Dispatch) => {
    const result = await getCakes();
    
    if (result) {
        dispatch(setCakes(result));
    }
};

export const getCakeThunkCreator = (id: string) => async (dispatch: Dispatch) => {
    const result = await getCake(id);
    
    if (result) {
        dispatch(setCake(result));
    }
};

export const createCakeThunkCreator = (data: object, images: File[]) => async (dispatch: Dispatch) => {
    const result = await createCake(data, images);
    
    if (result) {
        return {
            status: "ok"
        }
    }
};

export default cakesReducer;