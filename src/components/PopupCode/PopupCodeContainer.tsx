import { connect, ConnectedProps } from "react-redux";
import { RootState } from "../../redux/store"; 
import PopupCode from "./PopupCode";
import { sendCodeUserThunkCreator, setEmail, setType } from "../../redux/reducers/users-reducer";

const mapStateToProps = (state: RootState) => ({
    email: state.users.activeEmail
});

const connector = connect(mapStateToProps, {
    setEmail: setEmail,
    setType: setType,
    sendCode: sendCodeUserThunkCreator
});

export type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(PopupCode);