import { connect, ConnectedProps } from "react-redux";
import { RootState } from "../../redux/store"; 
import Chat from "./Chat";
import { getChatsThunkCreator, getChatsUserThunkCreator } from "../../redux/reducers/chats-reducer";

const mapStateToProps = (state: RootState) => ({
    chats: state.chats.chats,
    senderId: state.users.user?.id,
    senderName: state.users.user?.name,
    user: state.chats.user,
});

const connector = connect(mapStateToProps, {
    getChats: getChatsThunkCreator,
    getChatUser: getChatsUserThunkCreator
});

export type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(Chat);