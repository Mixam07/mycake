import "./PopupReg.css";
import { useFormik } from 'formik';
import close from "../../assets/icons/close.svg";

const PopupReg = (props: any) => {
    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
        },
        onSubmit: values => {
            props.registrateUser({ email: values.email, name: values.name }, props.type);
            props.setEmail(values.email)
            props.setIsRegPopup(false);
            props.setIsCodePopup(true);
        },
    });

    const onClick = (e: any) => {
        if (e.target.closest(".popup-reg__close") || e.target.classList.contains("popup-reg")) {
            props.setIsRegPopup(false);
            props.setType(null);
        }
    }

    const change = () => {
        props.setIsRegPopup(false);
        props.setIsLogPopup(true);
        props.setType(null);
    }
    return (
        <section onClick={onClick} className={`popup-reg ${props.isRegPopup && "active"}`}>
            <div className="popup-reg__content">
                <div className="popup-reg__header">
                    <h1 className="popup-reg__title">Реєстрація</h1>
                    <button className="popup-reg__close">
                        <img src={close} alt="close" />
                    </button>
                </div>
                <form className="popup-reg__form" onSubmit={formik.handleSubmit}>
                    <div className="popup-reg__item">
                        <label className="popup-reg__caption" htmlFor="name">Ім’я та прізвище</label>
                        <input
                            className="popup-reg__input"
                            id="name"
                            name="name"
                            type="text"
                            onChange={formik.handleChange}
                            value={formik.values.name}
                        />
                    </div>
                    <div>
                        <label className="popup-reg__caption" htmlFor="email">Eлектронна пошта</label>
                        <div className="popup-reg__wrapper">
                            <input
                                className="popup-reg__input"
                                id="email"
                                name="email"
                                type="text"
                                onChange={formik.handleChange}
                                value={formik.values.email}
                            />
                            <button className="popup-reg__submit" type="submit">Надіслати</button>
                        </div>
                    </div>
                </form>
                <button onClick={change} className="popup-reg__other">Я вже маю акаунт, хочу просто увійти</button>
            </div>
        </section>
    )
}

export default PopupReg