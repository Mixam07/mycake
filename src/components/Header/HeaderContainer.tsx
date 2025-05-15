import { connect, ConnectedProps } from "react-redux";
import { RootState } from "../../redux/store"; 
import Header from "./Header";
import { logoutThunkCreator } from "../../redux/reducers/users-reducer";

const mapStateToProps = (state: RootState) => ({
  user: state.users.user,
});

const connector = connect(mapStateToProps, {
  logout: logoutThunkCreator
});

export type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(Header);