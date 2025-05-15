import "./PopupType.css";
import close from "../../assets/icons/close.svg";

const PopupType = (props: any) => {
    const onClick = (e: any) => {
        if (e.target.closest(".popup-type__close") || e.target.classList.contains("popup-type")) {
            props.setIsTypePopup(false);
            props.setEmail(null);
        }
    }

    const change = () => {
        props.setIsTypePopup(false);
        props.setIsLogPopup(true);
        props.setEmail(null);
    }

    const choose = (type: string) => {
        props.setIsTypePopup(false);
        props.setIsRegPopup(true);
        props.setType(type);
    }
    return (
        <section onClick={onClick} className={`popup-type ${props.isTypePopup && "active"}`}>
            <div className="popup-type__content">
                <div className="popup-type__header">
                    <h1 className="popup-type__title">Реєстрація</h1>
                    <button className="popup-type__close">
                        <img src={close} alt="close" />
                    </button>
                </div>
                <div className="popup-type__variants">
                    <button onClick={ () => { choose("buyer") } } className="popup-type__item">
                        <div className="popup-type__information">
                            <h3 className="popup-type__caption">Покупець</h3>
                            <p className="popup-type__description">Хочу купувати, дарувати та їсти</p>
                        </div>
                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none">
                            <path d="M9.375 5.20801L16.6667 12.4997L9.375 19.7913" stroke="#43607C" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </button>
                    <button onClick={ () => { choose("confectioners") } } className="popup-type__item">
                        <div className="popup-type__information">
                            <h3 className="popup-type__caption">Кондитер</h3>
                            <p className="popup-type__description">Хочу випікати, прикрашати та продавати</p>
                        </div>
                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none">
                            <path d="M9.375 5.20801L16.6667 12.4997L9.375 19.7913" stroke="#5E2D07" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </button>
                </div>
                <button onClick={change} className="popup-type__other">Я вже маю акаунт, хочу просто увійти</button>
            </div>
        </section>
    )
}

export default PopupType;