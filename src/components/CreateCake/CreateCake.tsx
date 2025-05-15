import { useFormik } from "formik";
import { useState } from "react";
import "./CreateCake.css";
import axios from "axios";

const CreateCake = (props: any) => {
  const [images, setImages] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      tags: "",
      price: 0,
    },
    onSubmit: async values => {
        const tagsArray = values.tags.split(" ").filter(tag => tag.trim() !== "");

        const updatedValues = {
            ...values,
            tags: tagsArray,
        };

        const formData = new FormData();
        formData.append("data", JSON.stringify(updatedValues));
        images.forEach((img) => {
            formData.append("photos", img);
        });

        try {
            const response = await axios.post("http://localhost:3000/cakes", formData, {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            });
            console.log("✅ Успішно:", response.data);
          } catch (error) {
            console.error("❌ Помилка при відправці:", error);
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
            <div className="images-preview">
              {previews.map((src, i) => (
                  <div className="image-item" key={i}>
                  <img src={src} alt={`preview-${i}`} />
                  <button
                      type="button"
                      className="delete-btn"
                      onClick={() => handleDeleteImage(i)}
                  >
                      ❌
                  </button>
                  </div>
              ))}
              <label className="add-photo">
                  <span>➕ Додати фото</span>
                  <input type="file" accept="image/*" multiple onChange={handleImageChange} hidden />
              </label>
            </div>
          </div>
          <div className="create-cake__item">
            <h2 className="create-cake__caption">Назва</h2>
            <p className="create-cake__description">Назвіть оголошення стисло та зрозуміло. Намагайтесь не називати різні оголошення однаково, щоб в майбутньому було простіше працювати з заявками</p>
            <input name="name" type="text" onChange={formik.handleChange} value={formik.values.name} />
          </div>
          <div className="create-cake__item">
            <h2 className="create-cake__caption">Ціна</h2>
            <input id="price" name="price" type="number" onChange={formik.handleChange} value={formik.values.price} />
            <p>грн</p>
          </div>
          <div className="create-cake__item">
            <h2 className="create-cake__caption">Опис</h2>
            <p className="create-cake__description">Тут ви можна описати смаколик, його начинку, оцінити час виготовлення, тощо</p>
            <input name="description" type="text" onChange={formik.handleChange} value={formik.values.description} />
          </div>
          <div className="create-cake__item">
            <h2 className="create-cake__caption">Теги</h2>
            <p className="create-cake__description">Оберіть, які з характеристик найкраще відносяться до вашого смаколика</p>
            <input id="tags" name="tags" type="text" onChange={formik.handleChange} value={formik.values.tags} />
          </div>
          <button type="submit">Надіслати</button>
        </form>
      </div>
    </section>
  );
};

export default CreateCake;