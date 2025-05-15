import { connect, ConnectedProps } from "react-redux";
import { RootState } from "../../redux/store"; 
import CreateCake from "./CreateCake";
import { createCakeThunkCreator } from "../../redux/reducers/cakes-reducer";

const mapStateToProps = (state: RootState) => ({
    user: state.users.user,
    status: state.users.status
});

const connector = connect(mapStateToProps, {
    createCake: createCakeThunkCreator
});

export type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(CreateCake);