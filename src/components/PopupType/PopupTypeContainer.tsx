import { connect, ConnectedProps } from "react-redux";
import { RootState } from "../../redux/store"; 
import PopupType from "./PopupType";
import { setEmail, setType } from "../../redux/reducers/users-reducer";

const mapStateToProps = (state: RootState) => ({});

const connector = connect(mapStateToProps, {
    setEmail: setEmail,
    setType: setType
});

export type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(PopupType);