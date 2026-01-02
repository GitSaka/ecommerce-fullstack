import React from "react";
import { useSelector, useDispatch } from "react-redux";
// import { increaseQty, decreaseQty, removeFromCart, clearCart } from "../redux/cartSlice";
import "./cartPage.css";
import { clearCart, decreaseQty, increaseQty, removeFromCart } from "../../redux/cartSlice";
import {Link} from "react-router-dom"

const CartPage = () => {
  const dispatch = useDispatch();
  const { cartItems, totalAmount } = useSelector((state) => state.cart);

  return (
    <div className="cart-container">
      <h1 className="cart-title">Votre Panier</h1>

      {cartItems.length === 0 ? (
        <p className="cart-empty">Votre panier est vide.</p>
      ) : (
        <>
          {/* --- Zone Produits --- */}
          <div className="cart-items">
            {cartItems.map((item) => (
              <div key={item.id} className="cart-item">
                <img src={item.image} alt={item.title} className="cart-item-img" />

                <div className="cart-item-info">
                  <h3>{item.name}</h3>
                  <p className="cart-item-price">{item.price} FCFA</p>

                  <div className="cart-qty">
                    <button onClick={() => dispatch(decreaseQty(item.id))}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => dispatch(increaseQty(item.id))}>+</button>
                  </div>

                  <button
                    className="remove-btn"
                    onClick={() => dispatch(removeFromCart(item.id))}
                  >
                    Supprimer
                  </button>
                </div>

                <div className="cart-item-total">
                  {(item.price * item.quantity).toLocaleString()} FCFA
                </div>
              </div>
            ))}
          </div>

          {/* --- Résumé panier --- */}
          <div className="cart-summary">
            <h2>Résumé</h2>

            <div className="summary-row">
              <span>Total :</span>
              <strong>{totalAmount.toLocaleString()} FCFA</strong>
            </div>

            <button className="clear-cart" onClick={() => dispatch(clearCart())}>
              Vider le panier
            </button>
            <Link className="link-no-style" to={"/payement"}>
                <button className="checkout-btn">Passer la commande</button>
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;
