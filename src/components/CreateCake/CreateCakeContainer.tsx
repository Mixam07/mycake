import { connect, ConnectedProps } from "react-redux";
import { RootState } from "../../redux/store"; 
import CreateCake from "./CreateCake";

const mapStateToProps = (state: RootState) => ({
});

const connector = connect(mapStateToProps, {
});

export type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(CreateCake);