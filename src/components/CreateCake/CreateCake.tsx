import { useFormik } from "formik";
import { useState } from "react";
import "./CreateCake.css";
import add_photo from "../../assets/icons/add-photo.svg";
import remove from "../../assets/icons/remove.svg";
import { Navigate, useNavigate } from "react-router-dom";

const CreateCake = (props: any) => {
    const navigate = useNavigate();

    if(props.status && props.user.type !== "confectioner"){
        navigate("/");
    }
    
    const [images, setImages] = useState<File[]>([]);
    const [previews, setPreviews] = useState<string[]>([]);

    const formik = useFormik({
            initialValues: {
            name: "",
            description: "",
            tags: "",
            price: 0,
            images: ""
        },
        validate: (values) => {
            const errors: any = {};

            if (values.name.length <= 0) {
                errors.name = 'Введи назву';
            }

            if (values.description.length <= 0) {
                errors.description = 'Введи опис';
            }

            if (values.price <= 0) {
                errors.price = 'Введи вартість';
            }

            return errors;
        },
        onSubmit: async (values, { setErrors }) => {
            if (!images || images.length === 0) {
                return setErrors({ images: "Додай хоча б одне фото" });
            }

            const tagsArray = values.tags.split(" ").filter(tag => tag.trim() !== "");

            const updatedValues = {
                name: values.name,
                description: values.description,
                price: values.price,
                tags: tagsArray,
            };

            const result = await props.createCake(updatedValues, images);

            if(result.status == "ok"){
                navigate("/");
            }
        },
    });

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files) {
            const fileArray = Array.from(files);
            setImages(prev => [...prev, ...fileArray]);

            fileArray.forEach(file => {
                const reader = new FileReader();
                reader.onloadend = () => {
                    setPreviews(prev => [...prev, reader.result as string]);
                };
                reader.readAsDataURL(file);
            });
        }
    };

    const handleDeleteImage = (index: number) => {
        setImages(prev => prev.filter((_, i) => i !== index));
        setPreviews(prev => prev.filter((_, i) => i !== index));
    };

    return (
        <section className="create-cake">
            <div className="create-cake__container container">
                <form className="create-cake__wrapper" onSubmit={formik.handleSubmit}>
                    <h1 className="create-cake__title">Створення товару</h1>
                    <div className="create-cake__item">
                        <h2 className="create-cake__caption">Фото</h2>
                        <p className="create-cake__description">Додайте сюди своє фото або логотип компанії. Кондитерів з фото обирають частіше</p>
                        <label className="create-cake__add-photo">
                            <img src={add_photo} alt="add-photo" />
                            <span>Додати фото</span>
                            <input type="file" accept="image/*" multiple onChange={handleImageChange} hidden />
                        </label>
                        <div className="create-cake__images">
                        {previews.map((src, i) => (
                            <div className="create-cake__image-item" key={i}>
                                <img id="img" src={src} alt={`preview-${i}`} />
                                    <button
                                    type="button"
                                    className="create-cake__image-delete"
                                    onClick={() => handleDeleteImage(i)}
                                    >
                                    <img src={remove} alt="remove" />
                                </button>
                            </div>
                        ))}
                        </div>
                        <span className="create-cake__error">{formik.errors.images}</span>
                    </div>
                    <div className="create-cake__item">
                        <h2 className="create-cake__caption">Назва</h2>
                        <p className="create-cake__description">Назвіть оголошення стисло та зрозуміло. Намагайтесь не називати різні оголошення однаково, щоб в майбутньому було простіше працювати з заявками</p>
                        <input className="create-cake__input" name="name" type="text" onChange={formik.handleChange} value={formik.values.name} />
                        <span className="create-cake__error">{formik.errors.name}</span>
                    </div>
                    <div className="create-cake__item">
                        <h2 className="create-cake__caption">Ціна</h2>
                        <div className="create-cake__price">
                            <input className="create-cake__input" id="price" name="price" type="number" onChange={formik.handleChange} value={formik.values.price} />
                            <p className="create-cake__text">грн</p>
                        </div>
                        <span className="create-cake__error">{formik.errors.price}</span>
                    </div>
                    <div className="create-cake__item">
                        <h2 className="create-cake__caption">Опис</h2>
                        <p className="create-cake__description">Тут ви можна описати смаколик, його начинку, оцінити час виготовлення, тощо</p>
                        <input className="create-cake__input" name="description" type="text" onChange={formik.handleChange} value={formik.values.description} />
                        <span className="create-cake__error">{formik.errors.description}</span>
                    </div>
                    <div className="create-cake__item">
                        <h2 className="create-cake__caption">Теги</h2>
                        <p className="create-cake__description">Оберіть, які з характеристик найкраще відносяться до вашого смаколика</p>
                        <input className="create-cake__input" id="tags" name="tags" type="text" onChange={formik.handleChange} value={formik.values.tags} />
                    </div>
                    <div className="create-cake__wrap">
                        <button className="create-cake__submit" type="submit">Опублікувати товар</button>
                    </div>
                </form>
            </div>
        </section>
    );
};

export default CreateCake;