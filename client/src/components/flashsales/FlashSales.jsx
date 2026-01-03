import React, { useEffect, useState } from "react";
import "./flashsales.css";
import {Link} from "react-router-dom"

export default function FlashSales() {
  const [timeLeft, setTimeLeft] = useState({
    hours: 6,
    minutes: 30,
    seconds: 45,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        let { hours, minutes, seconds } = prev;

        if (seconds > 0) seconds--;
        else {
          seconds = 59;
          if (minutes > 0) minutes--;
          else {
            minutes = 59;
            if (hours > 0) hours--;
          }
        }

        return { hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const products = [
    {
      id: 1,
      title: "Préservatifs Durex Classic",
      price: 2990,
      oldPrice: 4500,
      discount: 35,
      img: "./1.jpeg",
    },
    {
      id: 2,
      title: "Lubrifiant Intime Premium",
      price: 2500,
      oldPrice: 3800,
      discount: 28,
      img: "./1.jpeg",
    },
    {
      id: 3,
      title: "Préservatifs Ultra Sensation",
      price: 3500,
      oldPrice: 5000,
      discount: 30,
      img: "./2.jpeg",
    },
    {
      id: 4,
      title: "Gel Intime Fraise 100ml",
      price: 2000,
      oldPrice: 3000,
      discount: 33,
      img: "./3.jpeg",
    },
  ];

  return (
    <section className="flash-container">
      {/* Header */}
      <div className="flash-header">
        <h2>🔥 Offres du jour</h2>

        {/* Timer */}
        <div className="timer">
          <span>
            {String(timeLeft.hours).padStart(2, "0")} :
            {String(timeLeft.minutes).padStart(2, "0")} :
            {String(timeLeft.seconds).padStart(2, "0")}
          </span>
        </div>
      </div>

      {/* Grid produits */}
      <div className="flash-grid">
        {products.map((item) => (
          <Link key={item.id}  to={`/product/${item.id}`}  className="link-no-style">
          <div className="flash-card" >
            <div className="discount">-{item.discount}%</div>

            <img src={item.img} alt={item.title} />

            <h3>{item.title}</h3>

            <div className="prices">
              <span className="price">{item.price} FCFA</span>
              <span className="old-price">{item.oldPrice} FCFA</span>
            </div>
          </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
