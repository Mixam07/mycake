import { connect, ConnectedProps } from "react-redux";
import { RootState } from "../../redux/store"; 
import PopupLog from "./PopupLog";
import { loginUserThunkCreator, setEmail } from "../../redux/reducers/users-reducer";

const mapStateToProps = (state: RootState) => ({});

const connector = connect(mapStateToProps, {
    login: loginUserThunkCreator,
    setEmail: setEmail
});

export type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(PopupLog);