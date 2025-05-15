import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { NavLink } from "react-router-dom";
import "./Cake.css";

const Cake = (props: any) => {
    const { id } = useParams();
    const [ mainPhoto, setMainPhoto ] = useState(props.cake?.photosURL[0]);

    useEffect(() => {
        setMainPhoto(props.cake?.photosURL[0]);
    }, [props.cake?.photosURL]);

    useEffect(() => {
        props.getCake(id);

        return () => {
            props.setActiveCake(null);
        }
    }, []);

    return (
        <section className="cake">
            <div className="cake__container container">
                <div className="cake__wrapper">
                    <div className="cake__galery">
                        <div className="cake__main-image">
                            <img src={mainPhoto} alt="main-photo" />
                        </div>
                        <div className="cake__images">
                            {
                                props.cake?.photosURL.map((item: string, i: number) => {
                                    return <img onClick={ () => { setMainPhoto(item) } } key={i+1} src={item} />
                                })
                            }
                        </div>
                    </div>
                    <div className="cake__information">
                        <div className="cake__tags">
                            {
                                props.cake?.tags.map((item: string, i: number) => {
                                    return <span key={i+1} className="cake__tag">{item}</span>
                                })
                            }
                        </div>
                        <h1 className="cake__title">{props.cake?.name}</h1>
                        <p className="cake__price">{props.cake?.price} грн</p>
                        <p className="cake__description">{props.cake?.description}</p>
                    </div>
                </div>
                <div className="cake__confectioner">
                    <div className="cake__wrap">
                        <div className="cake__photo">
                            { props.cake?.user?.photoURL ? <img src={props.cake?.user?.photoURL} alt="" /> : <img src="https://lh3.googleusercontent.com/a/default-user=s80-p" alt="" /> }
                        </div>
                        <div className="cake__info">
                            <h2 className="cake__name">{props.cake?.user?.name}</h2>
                            <NavLink className="cake__link" to={`/chats/${props.cake?.user?.id}`}>Написати</NavLink>
                        </div>
                    </div>
                    <p className="cake__desc">{props.cake?.user?.description || "Користувач напише про себе пізніше"}</p>
                </div>
            </div>
        </section>
    )
}

export default Cake;