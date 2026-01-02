import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
// import { clearCart } from "../redux/cartSlice";
import "./payement.css";
import { clearCart } from "../../redux/cartSlice";
import axios from "axios";

export default function Payement() {
  const dispatch = useDispatch();
  const { cartItems, totalAmount } = useSelector((s) => s.cart);

  // Local UI state léger
  const [payMethod, setPayMethod] = useState("cod"); // "cod" = paiement à la livraison
  const [submitting, setSubmitting] = useState(false);
  const [successOrder, setSuccessOrder] = useState(null);

  const shippingFee = cartItems.length > 0 ? 1500 : 0;

  const handleSubmit = (e) => {
    e.preventDefault();

    // lecture simple des champs (version légère)
    const fullName = e.target.fullName.value.trim();
    const email = e.target.email.value.trim();
    const phone = e.target.phone.value.trim();
    const address = e.target.address.value.trim();
    const city = e.target.city.value.trim();
    const note = e.target.note.value.trim();

    // validation minimaliste
    if (!fullName || !phone || !address || !city) {
      // message simple mais visible
      const el = document.querySelector(".checkout-error");
      if (el) {
        el.innerText = "Veuillez remplir les champs obligatoires (Nom, Téléphone, Adresse, Ville).";
        el.style.opacity = "1";
        setTimeout(() => (el.style.opacity = "0"), 4500);
      }
      return;
    }

    if (cartItems.length === 0) {
      const el = document.querySelector(".checkout-error");
      if (el) {
        el.innerText = "Votre panier est vide.";
        el.style.opacity = "1";
        setTimeout(() => (el.style.opacity = "0"), 3000);
      }
      return;
    }

    setSubmitting(true);

    // créer la commande
    const order = {
      id: Date.now(),
      createdAt: new Date().toISOString(),
      customer: { fullName, email, phone, address, city, note },
      paymentMethod: payMethod === "cod" ? "Paiement à la livraison" : payMethod,
      items: cartItems.map((it) => ({
        id: it.id,
        name: it.title || it.name || "Produit",
        price: it.price,
        quantity: it.quantity,
      })),
      subtotal: totalAmount,
      shipping: shippingFee,
      total: totalAmount + shippingFee,
      status: "pending",
    };

    // sauvegarder la commande dans localStorage
    const existing = JSON.parse(localStorage.getItem("orders") || "[]");
    existing.unshift(order);
    localStorage.setItem("orders", JSON.stringify(existing));

    // vider le panier (redux)
    dispatch(clearCart());

    setSubmitting(false);
    setSuccessOrder(order);

    // reset form fields (optionnel)
    e.target.reset();
  };

  // Fonction qui lance le paiement PayDunya
const handlePay = async () => {
  // validation rapide : pas de paiement si panier vide
  if (!cartItems || cartItems.length === 0) {
    alert("Votre panier est vide.");
    return;
  }

  setSubmitting(true);
  try {
    const response = await axios.post(
      "https://ideologic-harold-bankerly.ngrok-free.dev/api/paydunya/create-invoice",
      {
        items: cartItems.map((it) => ({
          name: it.title || it.name || "Produit",
          quantity: it.quantity,
          unit_price: it.price,
          total_price: it.price * it.quantity,
        })),
        amount: totalAmount,
      }
    );

    const data = response.data;
    console.log(response)

    if (!data || !data.payment_url) {
      throw new Error("Aucune URL de paiement reçue.");
    }

    // rediriger l'utilisateur vers PayDunya
    window.location.href = data.payment_url;
  } catch (err) {
    console.error(err);
    alert("Impossible d'initialiser le paiement en ligne. Réessayez.");
    setSubmitting(false);
  }
};


  return (
    <div className="checkout-page">
      <h1 className="checkout-title">Finaliser la commande</h1>

      <div className="checkout-grid">
        {/* LEFT: FORM */}
        <form className="checkout-form card" onSubmit={handleSubmit} noValidate>
          <h2>Informations de livraison</h2>

          <div className="field-row">
            <label>
              Nom complet *
              <input name="fullName" placeholder="Prénom Nom" />
            </label>
            <label>
              Email
              <input name="email" placeholder="exemple@domaine.com" />
            </label>
          </div>

          <div className="field-row">
            <label>
              Téléphone *
              <input name="phone" placeholder="+229 60 00 00 00" />
            </label>
            <label>
              Ville *
              <input name="city" placeholder="Cotonou" />
            </label>
          </div>

          <label>
            Adresse complète *
            <input name="address" placeholder="Rue, n°, quartier" />
          </label>

          <label>
            Note (optionnelle)
            <textarea name="note" rows="3" placeholder="Détails pour la livraison..." />
          </label>

          <h3 className="section-sub">Méthode de paiement</h3>

         <div className="pay-methods">
            <label className={`pay-option ${payMethod === "cod" ? "active" : ""}`}>
              <input
                type="radio"
                name="pay"
                value="cod"
                checked={payMethod === "cod"}
                onChange={() => setPayMethod("cod")}
              />
              Paiement à la livraison
            </label>

            <label className={`pay-option ${payMethod === "online" ? "active" : ""}`}>
              <input
                type="radio"
                name="pay"
                value="online"
                checked={payMethod === "online"}
                onChange={() => setPayMethod("online")}
              />
              Paiement en ligne (PayDunya)
            </label>
        </div>


          <div className="checkout-error" aria-hidden="true" />

          <div className="actions">
  {payMethod === "online" ? (
    <button
      type="button"
      className="btn-primary"
      disabled={submitting}
      onClick={handlePay}
    >
      {submitting ? "Redirection..." : "Payer maintenant"}
    </button>
  ) : (
    <button type="submit" className="btn-primary" disabled={submitting}>
      {submitting ? "Validation..." : "Valider la commande"}
    </button>
  )}
</div>

        </form>

        {/* RIGHT: SUMMARY */}
        <aside className="order-summary card">
          <h2>Récapitulatif</h2>

          <div className="summary-list">
            {cartItems.length === 0 ? (
              <p className="muted">Votre panier est vide.</p>
            ) : (
              cartItems.map((it) => (
                <div className="summary-item" key={it.id}>
                  <div className="sum-left">
                    <img src={it.image} alt={it.title || it.name} />
                    <div className="sum-meta">
                      <div className="sum-name">{it.title || it.name}</div>
                      <div className="sum-qty">x{it.quantity}</div>
                    </div>
                  </div>
                  <div className="sum-price">
                    {(it.price * it.quantity).toLocaleString()} FCFA
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="summary-totals">
            <div className="row">
              <span>Sous-total</span>
              <strong>{totalAmount.toLocaleString()} FCFA</strong>
            </div>
            <div className="row">
              <span>Livraison</span>
              <strong>{shippingFee.toLocaleString()} FCFA</strong>
            </div>
            <div className="row total">
              <span>Total</span>
              <strong>{(totalAmount + shippingFee).toLocaleString()} FCFA</strong>
            </div>
          </div>

          <p className="muted small">
            Après validation, vous recevrez les instructions de paiement par e-mail si nécessaire.
          </p>
        </aside>
      </div>

      {/* SUCCESS MODAL (simple) */}
      {successOrder && (
        <div className="success-modal">
          <div className="success-card">
            <h2>Commande enregistrée 🎉</h2>
            <p>
              Merci {successOrder.customer.fullName}. Votre commande a été enregistrée.
            </p>
            <p>
              <strong>ID :</strong> {successOrder.id}
            </p>
            <p>
              <strong>Montant :</strong> {successOrder.total.toLocaleString()} FCFA
            </p>

            <div className="modal-actions">
              <button
                onClick={() => {
                  setSuccessOrder(null);
                }}
                className="btn-primary"
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
