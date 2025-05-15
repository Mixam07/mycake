import "./Header.css";
import { NavLink } from "react-router-dom";
import logo from "../../assets/icons/logo.svg";
import { useState } from "react";
import PopupLogContainer from "../PopupLog/PopupLogContainer";
import PopupCodeContainer from "../PopupCode/PopupCodeContainer";
import PopupTypeContainer from "../PopupType/PopupTypeContainer";
import PopupRegContainer from "../PopupReg/PopupRegContainer";
import forum from "../../assets/icons/forum.svg";

const Header = (props: any) => {
    const [ isLogPopup, setIsLogPopup ] = useState(false);
    const [ isTypePopup, setIsTypePopup ] = useState(false);
    const [ isRegPopup, setIsRegPopup ] = useState(false);
    const [ isCodePopup, setIsCodePopup ] = useState(false);

    return (
        <>
            <header className="header">
                <div className="header__container container">
                    <div className="header__wrapper">
                        <NavLink className="header__logo" to="/">
                            <img src={logo} alt="" />
                        </NavLink>
                        <div className="header__user">
                            {
                                props.user ?
                                <>
                                    <NavLink to="/chats">
                                        <img width="25px" src={forum} alt="forum" />
                                    </NavLink>
                                    <p>{props.user.name}</p> |
                                    <button onClick={ () => { props.logout() } }>Вийти</button>
                                </>:
                                <button onClick={ () => { setIsLogPopup(true) } } className="header__signin">Увійти</button>
                            }
                        </div>
                    </div>
                </div>
            </header>
            <PopupTypeContainer isTypePopup={isTypePopup} setIsTypePopup={setIsTypePopup} setIsLogPopup={setIsLogPopup} setIsRegPopup={setIsRegPopup} />
            <PopupRegContainer isRegPopup={isRegPopup} setIsRegPopup={setIsRegPopup} setIsLogPopup={setIsLogPopup} setIsCodePopup={setIsCodePopup} />
            <PopupLogContainer isLogPopup={isLogPopup} setIsLogPopup={setIsLogPopup} setIsTypePopup={setIsTypePopup} setIsCodePopup={setIsCodePopup} />
            <PopupCodeContainer isCodePopup={isCodePopup} setIsCodePopup={setIsCodePopup} />
        </>
    )
}

export default Header;