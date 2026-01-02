import { useParams } from "react-router-dom";
import { useState } from "react";
import "./productDetails.css";
import { productsData } from "../../data";
import {addToCart} from '../../redux/cartSlice';
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import ProductDescription from "../../components/productdescription/ProductDescription";
import ProductDesc from "../../components/productdescription/ProductDesc";

export default function ProductDetails() {
  const { id } = useParams();
  const product = productsData.find((p) => p.id === Number(id));
  const [activeImage, setActiveImage] = useState(product.image);
  const [selectedBrand, setSelectedBrand] = useState(product.brand);
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);
  const [quantity, setQuantity]= useState(1);
  const text = `
            et je mets le texte ici 
            et je vais à la ligne sans problème
            même plusieurs lignes Lorem ipsum dolor sit amet, consectetur adipiscing 
            elit.Donec ut libero 
            sed arcu vehicula feugiat. Aliquam erat volutpat
            .Phasellus nec sapien
             eu libero porttitor placerat. Integer 
            portatincidunt leo, vitae volutpat mauris fringilla quis. Lorem
             ipsum dolor sit amet, consectetur adipiscing elit
             et je mets le texte ici 
            et je vais à la ligne sans problème
            même plusieurs lignes Lorem ipsum dolor sit amet, consectetur adipiscing 
            elit.Donec ut libero 
            sed arcu vehicula feugiat. Aliquam erat volutpat
            .Phasellus nec sapien
             eu libero porttitor placerat. Integer 
            portatincidunt leo, vitae volutpat mauris fringilla quis. Lorem
             ipsum dolor sit amet, consectetur adipiscing elit
             et je mets le texte ici 
            et je vais à la ligne sans problème
            même plusieurs lignes Lorem ipsum dolor sit amet, consectetur adipiscing 
            elit.Donec ut libero 
            sed arcu vehicula feugiat. Aliquam erat volutpat
            .Phasellus nec sapien
             eu libero porttitor placerat. Integer 
            portatincidunt leo, vitae volutpat mauris fringilla quis. Lorem
             ipsum dolor sit amet, consectetur adipiscing elit
             et je mets le texte ici 
            et je vais à la ligne sans problème
            même plusieurs lignes Lorem ipsum dolor sit amet, consectetur adipiscing 
            elit.Donec ut libero 
            sed arcu vehicula feugiat. Aliquam erat volutpat
            .Phasellus nec sapien
             eu libero porttitor placerat. Integer 
            portatincidunt leo, vitae volutpat mauris fringilla quis. Lorem
             ipsum dolor sit amet, consectetur adipiscing elit
             et je mets le texte ici 
            et je vais à la ligne sans problème
            même plusieurs lignes Lorem ipsum dolor sit amet, consectetur adipiscing 
            elit.Donec ut libero 
            sed arcu vehicula feugiat. Aliquam erat volutpat
            .Phasellus nec sapien
             eu libero porttitor placerat. Integer 
            portatincidunt leo, vitae volutpat mauris fringilla quis. Lorem
             ipsum dolor sit amet, consectetur adipiscing elit
             et je mets le texte ici 
            et je vais à la ligne sans problème
            même plusieurs lignes Lorem ipsum dolor sit amet, consectetur adipiscing 
            elit.Donec ut libero 
            sed arcu vehicula feugiat. Aliquam erat volutpat
            .Phasellus nec sapien
             eu libero porttitor placerat. Integer 
            portatincidunt leo, vitae volutpat mauris fringilla quis. Lorem
             ipsum dolor sit amet, consectetur adipiscing elit
             et je mets le texte ici 
            et je vais à la ligne sans problème
            même plusieurs lignes Lorem ipsum dolor sit amet, consectetur adipiscing 
            elit.Donec ut libero 
            sed arcu vehicula feugiat. Aliquam erat volutpat
            .Phasellus nec sapien
             eu libero porttitor placerat. Integer 
            portatincidunt leo, vitae volutpat mauris fringilla quis. Lorem
             ipsum dolor sit amet, consectetur adipiscing elit
             et je mets le texte ici 
            et je vais à la ligne sans problème
            même plusieurs lignes Lorem ipsum dolor sit amet, consectetur adipiscing 
            elit.Donec ut libero 
            sed arcu vehicula feugiat. Aliquam erat volutpat
            .Phasellus nec sapien
             eu libero porttitor placerat. Integer 
            portatincidunt leo, vitae volutpat mauris fringilla quis. Lorem
             ipsum dolor sit amet, consectetur adipiscing elit
             
    `

  if (!product) {
    return <h2 className="not-found">Produit introuvable</h2>;
  }

 const handleclick = ()=>{
   const isAlreadyAdded = cartItems.some((item) => item.id === product.id);

   dispatch(addToCart({...product,image:activeImage,quantity:quantity,brand:selectedBrand}))

   if (isAlreadyAdded) {
    toast.info("Ce produit est déjà dans votre panier, quantité mise à jour !");
  } else {
    toast.success("Produit ajouté au panier !");
  }

 }
//  console.log(selectedBrand);

  const brandOptions = ["Nike", "Adidas", "Puma", "Fendi", "Gucci"];

  return (
    <div className="Productdetails">
        
    <div className="product-details-container">

      {/* LEFT SIDE = IMAGE GALLERY */}
      <div className="image-section">

        <img
          src={activeImage}
          alt={product.name}
          className="main-image"
          />

        <div className="thumbnail-row">
          {[product.image, product.image2, product.image3]
            .filter(Boolean)
            .map((img, idx) => (
                <img
                key={idx}
                src={img}
                onClick={() => setActiveImage(img)}
                className={`thumbnail ${activeImage === img ? "active-thumb" : ""}`}
                />
            ))}
        </div>

      </div>

      {/* RIGHT SIDE = PRODUCT INFO */}
      <div className="info-section">

        <h1 className="product-title">{product.name}</h1>
        <p className="product-price">{product.price.toLocaleString()} FCFA</p>

        {/* BRAND SELECTOR */}
        <div className="brand-selector">
          <p>Marque :</p>
          <div className="brand-row">
            {brandOptions.map((b) => (
                <button
                key={b}
                onClick={() => setSelectedBrand(b)}
                className={`brand-btn ${selectedBrand === b ? "brand-active" : ""}`}
                >
                {b}
              </button>
            ))}
          </div>
        </div>
        <div className="quantity-box">
          <h4>Quantity</h4>
          <button onClick={() => setQuantity((q) => (q > 1 ? q - 1 : 1))}>-</button>
          <span>{quantity}</span>
          <button onClick={() => setQuantity((q) => q + 1)}>+</button>
        </div>

        {/* DESCRIPTION */}
        <p className="product-description">
          {product.description ||
            "Ce produit est fabriqué avec des matériaux de haute qualité, conçu pour offrir style et durabilité. Parfait pour un usage quotidien ou un événement spécial."}
        </p>

        {/* BUTTONS */}
        <div className="btn-group">
          <button className="btn-primary" onClick={handleclick}>Ajouter au panier</button>
          <button className="btn-secondary" onClick={() => window.history.back()}>
            Retour
          </button>
        </div>

      </div>
       

    </div>

    
    {/* LONG DESCRIPTION */}
    <div className="product-descriptionl">
        <h3>Description du produit</h3>
          <ProductDesc text={text} />
    </div>

        {/* CUSTOMER REVIEWS */}
      <div className="reviews-section">
        <h3>Avis des clients</h3>

        {/* List des avis */}
        <div className="review-item">
          <div className="review-header">
            <h4>Jean K.</h4>
            <span className="review-stars">★★★★☆</span>
          </div>
          <p className="review-text">
            Très bon produit, qualité au top. Je recommande fortement !
          </p>
        </div>

        <div className="review-item">
          <div className="review-header">
            <h4>Sofia B.</h4>
            <span className="review-stars">★★★★★</span>
          </div>
          <p className="review-text">
            Livraison rapide et produit conforme à la description.
          </p>
        </div>

        {/* Formulaire ajouter un avis */}
        <div className="add-review">
          <h4>Laissez votre avis :</h4>

          <textarea
            placeholder="Écrivez votre commentaire ici..."
            className="review-textarea"
          />

          <button className="submit-review">Envoyer</button>
        </div>
      </div>

      {/* PRODUITS SIMILAIRES */}
      <div className="similar-products">
        <h3 className="similar-title">Produits similaires</h3>

        <div className="similar-grid">

          <div className="similar-card">
            <img 
              src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=400&q=80"
              alt="produit"
            />
            <p className="name">Préservatif Premium</p>
            <p className="price">12 000 FCFA</p>
          </div>

          <div className="similar-card">
            <img 
              src="https://images.unsplash.com/photo-1629198735660-a9751c59a14d?auto=format&fit=crop&w=400&q=80"
              alt="produit"
            />
            <p className="name">Lubrifiant Naturel</p>
            <p className="price">9 000 FCFA</p>
          </div>

          <div className="similar-card">
            <img 
              src="https://images.unsplash.com/photo-1600180758895-6fc06bc9a0db?auto=format&fit=crop&w=400&q=80"
              alt="produit"
            />
            <p className="name">Préservatif Ultra-Fin</p>
            <p className="price">10 500 FCFA</p>
          </div>

          <div className="similar-card">
            <img 
              src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=400&q=80"
              alt="produit"
            />
            <p className="name">Gel Relax</p>
            <p className="price">8 000 FCFA</p>
          </div>

        </div>
      </div>


 </div>
  );
}
