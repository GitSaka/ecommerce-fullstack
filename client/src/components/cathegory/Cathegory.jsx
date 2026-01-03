import { useRef} from "react";
import './cathegory.css' 
import { Link } from "react-router-dom";
import { productsData } from "../../data";
// import api from "../../admin/services/api";

export default function Category() {
   const carouselRef = useRef(null);

//    const items = [
//     { id: 1, name: "iPhone 14", brand: "apple", price: 620000, isNew: true },
//     { id: 2, name: "Samsung S22", brand: "samsung", price: 450000, isNew: false },
//     { id: 3, name: "Tecno Spark 10", brand: "tecno", price: 90000, isNew: true },
//     { id: 4, name: "Infinix Note 30", brand: "infinix", price: 120000, isNew: false },
//     { id: 5, name: "Infinix Note 30", brand: "infinix", price: 120000, isNew: false },
//     { id: 6, name: "Infinix Note 30", brand: "infinix", price: 120000, isNew: false },
//     { id: 7, name: "Infinix Note 30", brand: "infinix", price: 120000, isNew: false },
//   ];

    const scrollLeft = () => {
        carouselRef.current.scrollBy({ left: -300, behavior: "smooth" });
    };

    const scrollRight = () => {
        carouselRef.current.scrollBy({ left: 300, behavior: "smooth" });
    };
    //  const [items,setItems] = useState([]);
    //  const imageBaseURL = "http://localhost:5000/uploads/categories/";
    

    // useEffect(()=>{
    //     const getAllcathe = async()=>{
    //         try {
    //             const res = await api.get('/categories');
    //             setItems(res.data)
    //             console.log(res.data)
    //         } catch (error) {
    //             console.log(error)
    //         }
    //     }

    //     getAllcathe();
    // },[])

    return (
        <div className="carousel-container">
            <button className="arrow left" onClick={scrollLeft}>‹</button>

            <div className="carousel" ref={carouselRef}>
                {productsData.map(item => (
                    <Link key={item.id} to={`/category/${item.id}`} className="link-no-style">
                    <div className="card" >
                        <img src={item.image} alt={item.name} />
                        <p>{item.name}</p>
                    </div>
                    </Link>
                ))}
            </div>

            <button className="arrow right" onClick={scrollRight}>›</button>
        </div>
    );
}
