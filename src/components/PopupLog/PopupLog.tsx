import "./PopupLog.css";
import { useFormik } from 'formik';
import close from "../../assets/icons/close.svg";

const PopupLog = (props: any) => {
    const formik = useFormik({
        initialValues: {
            email: '',
        },
        onSubmit: values => {
            props.login({ email: values.email });
            props.setEmail(values.email)
            props.setIsLogPopup(false);
            props.setIsCodePopup(true);
        },
    });

    const onClick = (e: any) => {
        if (e.target.closest(".popup-log__close") || e.target.classList.contains("popup-log")) {
            props.setIsLogPopup(false);
        }
    }

    const change = () => {
        props.setIsLogPopup(false);
        props.setIsTypePopup(true);
    }

    return (
        <section onClick={onClick} className={`popup-log ${props.isLogPopup && "active"}`}>
            <div className="popup-log__content">
                <div className="popup-log__header">
                    <h1 className="popup-log__title">Вхід</h1>
                    <button className="popup-log__close">
                        <img src={close} alt="close" />
                    </button>
                </div>
                <form className="popup-log__form" onSubmit={formik.handleSubmit}>
                    <div>
                        <label className="popup-log__caption" htmlFor="email">Eлектронна пошта</label>
                        <div className="popup-log__wrapper">
                            <input
                                className="popup-log__input"
                                id="email"
                                name="email"
                                type="text"
                                onChange={formik.handleChange}
                                value={formik.values.email}
                            />
                            <button className="popup-log__submit" type="submit">Надіслати</button>
                        </div>
                    </div>
                </form>
                <button onClick={change} className="popup-log__other">У мене немає акаунту, треба зареєструватися</button>
            </div>
        </section>
    )
}

export default PopupLog;