import { connect, ConnectedProps } from "react-redux";
import { RootState } from "../../redux/store"; 
import PopupReg from "./PopupReg";
import { registrateUserThunkCreator, setEmail, setType } from "../../redux/reducers/users-reducer";

const mapStateToProps = (state: RootState) => ({
    type: state.users.typeReg
});

const connector = connect(mapStateToProps, {
    setEmail: setEmail,
    setType: setType,
    registrateUser: registrateUserThunkCreator
});

export type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(PopupReg);