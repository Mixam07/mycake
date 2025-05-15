import { useEffect } from "react";
import "./Index.css"
import { NavLink } from "react-router-dom";

const Index = (props: any) => {
    const cakes = props.cakes?.map((item: any, i: number) => {
        return (
            <div key={i+1} className="index__item">
                <NavLink to={`/cakes/${item.id}`} className="index__image">
                    <img src={item.photosURL[0]} alt="photo" />
                </NavLink>
                <div className="index__information">
                    <p className="index__price">{item.price} грн</p>
                    <NavLink to={`/cakes/${item.id}`} className="index__name">{item.name}</NavLink>
                </div>
            </div>
        )
    })
    useEffect(() => {
        props.getCakes()
    }, []);
    return (
        <section className="index">
            <div className="index__container container">
                <div className="index__wrapper">
                    {cakes}
                </div>
            </div>
        </section>
    )
}

export default Index;