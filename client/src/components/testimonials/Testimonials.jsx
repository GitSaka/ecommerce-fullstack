import React, { useState, useEffect } from "react";
import "./testimonials.css";

const testimonials = [
  {
    name: "Sarah Konaté",
    role: "Cliente satisfaite",
    image: "./6.jpeg",
    text: "J'ai été impressionnée par la qualité du service. Les produits sont magnifiques et livrés rapidement !",
  },
  {
    name: "Patrick Dossa",
    role: "Acheteur vérifié",
    image: "./6.jpeg",
    text: "Un service professionnel du début à la fin. Je recommande fortement !",
  },
  {
    name: "Mélanie K.",
    role: "Cliente régulière",
    image: "./6.jpeg",
    text: "Toujours satisfaite. Les nouveautés sont incroyables à chaque fois !",
  },
];

export default function Testimonials() {
  const [index, setIndex] = useState(0);

  const next = () => {
    setIndex((index + 1) % testimonials.length);
  };

  const prev = () => {
    setIndex((index - 1 + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      next();
    }, 5000);

    return () => clearInterval(timer);
  }, [next]);

  return (
    <div className="testimonials-container">
      <h2 className="title">Avis de nos Clients</h2>

      <div className="testimonial-card">
      <div className="avatarcontainer">
             <img
                src={testimonials[index].image}
                alt="client"
                className="avatar"
              />
      </div>
        
        <h3 className="name">{testimonials[index].name}</h3>
        <p className="role">{testimonials[index].role}</p>

        <p className="text">
          “{testimonials[index].text}”
        </p>

        <div className="arrows">
          <button onClick={prev} className="arrow-btn">←</button>
          <button onClick={next} className="arrow-btn">→</button>
        </div>
      </div>
    </div>
  );
}
