import { Dispatch } from "redux";
import { getChats, getChatUser } from "../../api/chats";

const SET_CHATS = "SET-CHATS/chats";
const SET_CHAT_USER = "SET-CHAT_USER/chats";

export interface Chat {
    _id: string,
    opponent: {
        name: string,
    },
    opponentModel: "buyer" | "confectioner",
    messages: [
        {
            user: string,
            text: string,
        }
    ]
}

export interface ChatsState {
    chats: Chat | null;
    user: object | null
}

const initialState: ChatsState = {
    chats: null,
    user: null
};

const chatsReducer = (state = initialState, action: any): ChatsState => {
    switch(action.type) {
        case SET_CHATS:
            return {
                ...state,
                chats: action.data
            };
        case SET_CHAT_USER:
            return {
                ...state,
                user: action.data
            };
        default:
            return state;
    }
};

export const setChats = (data: Chat | null) => ({type: SET_CHATS, data});
export const setChatUser = (data: object | null) => ({type: SET_CHAT_USER, data});

export const getChatsThunkCreator = () => async (dispatch: Dispatch) => {
    const chats = await getChats();

    if(chats) {
        dispatch(setChats(chats))
    }
};

export const getChatsUserThunkCreator = (id: string) => async (dispatch: Dispatch) => {
    const user = await getChatUser(id);
    
    if(user) {
        dispatch(setChatUser({
            name: user.name,
            id: user.id
        }))
    }
};

export default chatsReducer;