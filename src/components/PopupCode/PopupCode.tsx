import "./PopupCode.css";
import { useFormik } from 'formik';
import close from "../../assets/icons/close.svg";

const PopupCode = (props: any) => {
    const formik = useFormik({
        initialValues: {
            code: '',
        },
        onSubmit: values => {
            props.sendCode(values.code, props.email);
            props.setIsCodePopup(false);
            props.setEmail(null);
            props.setType(null);
        },
    });
    
    const onClick = (e: any) => {
        if (e.target.closest(".popup-code__close") || e.target.classList.contains("popup-code")) {
            props.setIsCodePopup(false);
            props.setEmail(null);
            props.setType(null);
        }
    }

    if (props.isCodePopup && !props.email) {
        props.setIsCodePopup(false);
    }
    return (
        <section onClick={onClick} className={`popup-code ${props.isCodePopup && "active"}`}>
            <div className="popup-code__content">
                <div className="popup-code__header">
                    <h1 className="popup-code__title">Вхід</h1>
                    <button className="popup-code__close">
                        <img src={close} alt="close" />
                    </button>
                </div>
                <form className="popup-code__form" onSubmit={formik.handleSubmit}>
                    <label className="popup-code__caption" htmlFor="email">Введіть код з повідомлення</label>
                    <input
                        className="popup-code__input"
                        id="code"
                        name="code"
                        type="text"
                        onChange={formik.handleChange}
                        value={formik.values.code}
                    />
                    <button className="popup-code__submit" type="submit">Підтвердити</button>
                </form>
            </div>
        </section>
    )
}

export default PopupCode;