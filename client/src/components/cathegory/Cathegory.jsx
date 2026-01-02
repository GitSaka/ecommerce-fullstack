import { useEffect, useRef, useState } from "react";
import './cathegory.css' 
import { Link } from "react-router-dom";
import api from "../../admin/services/api";

export default function Category() {
   const carouselRef = useRef(null);

    const scrollLeft = () => {
        carouselRef.current.scrollBy({ left: -300, behavior: "smooth" });
    };

    const scrollRight = () => {
        carouselRef.current.scrollBy({ left: 300, behavior: "smooth" });
    };
     const [items,setItems] = useState([]);
     const imageBaseURL = "http://localhost:5000/uploads/categories/";
    

    useEffect(()=>{
        const getAllcathe = async()=>{
            try {
                const res = await api.get('/categories');
                setItems(res.data)
                console.log(res.data)
            } catch (error) {
                console.log(error)
            }
        }

        getAllcathe();
    },[])

    return (
        <div className="carousel-container">
            <button className="arrow left" onClick={scrollLeft}>‹</button>

            <div className="carousel" ref={carouselRef}>
                {items.map(item => (
                    <Link key={item.id} to={`/category/${item.slug}`} className="link-no-style">
                    <div className="card" >
                        <img src={imageBaseURL+item.image} alt={item.name} />
                        <p>{item.name}</p>
                    </div>
                    </Link>
                ))}
            </div>

            <button className="arrow right" onClick={scrollRight}>›</button>
        </div>
    );
}
