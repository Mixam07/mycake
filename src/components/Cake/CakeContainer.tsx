import { connect, ConnectedProps } from "react-redux";
import { RootState } from "../../redux/store"; 
import Cake from "./Cake";
import { getCakeThunkCreator, setCake } from "../../redux/reducers/cakes-reducer";

const mapStateToProps = (state: RootState) => ({
    cake: state.cakes.activeCake,
});

const connector = connect(mapStateToProps, {
    getCake: getCakeThunkCreator,
    setActiveCake: setCake
});

export type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(Cake);