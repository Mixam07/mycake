import { connect, ConnectedProps } from "react-redux";
import { RootState } from "../../redux/store"; 
import Index from "./Index";
import { getCakesThunkCreator } from "../../redux/reducers/cakes-reducer";

const mapStateToProps = (state: RootState) => ({
    cakes: state.cakes.cakes
});

const connector = connect(mapStateToProps, {
    getCakes: getCakesThunkCreator
});

export type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(Index);