import { connect, ConnectedProps } from "react-redux";
import { RootState } from "../../redux/store"; 
import App from "./App";
import { getAuthThunkCreator } from "../../redux/reducers/users-reducer";

const mapStateToProps = (state: RootState) => ({});

const connector = connect(mapStateToProps, {
    getAuth: getAuthThunkCreator
});

export type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(App);