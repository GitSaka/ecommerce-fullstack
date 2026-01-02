import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
// import { clearCart } from "../redux/cartSlice";
import "./checkout.css";
import { clearCart } from "../../redux/cartSlice";

export default function Checkout() {
  const dispatch = useDispatch();
  const { cartItems, totalAmount } = useSelector((state) => state.cart);

  // Form state
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    note: "",
  });

  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const shippingFee = cartItems.length > 0 ? 1500 : 0; // exemple

  const handleChange = (e) => {
    setForm((s) => ({ ...s, [e.target.name]: e.target.value }));
  };

  const validate = () => {
    const err = {};
    if (!form.fullName.trim()) err.fullName = "Nom complet requis";
    if (!form.email.trim() || !/^\S+@\S+\.\S+$/.test(form.email))
      err.email = "Email valide requis";
    if (!form.phone.trim() || form.phone.length < 7)
      err.phone = "Téléphone valide requis";
    if (!form.address.trim()) err.address = "Adresse requise";
    if (!form.city.trim()) err.city = "Ville requise";
    return err;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const err = validate();
    setErrors(err);
    if (Object.keys(err).length > 0) return;

    if (cartItems.length === 0) {
      alert("Votre panier est vide.");
      return;
    }

    setSubmitting(true);

    // Création de la commande (fake)
    const order = {
      id: Date.now(),
      createdAt: new Date().toISOString(),
      customer: { ...form },
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

    // Sauvegarder dans localStorage (orders)
    const existing = JSON.parse(localStorage.getItem("orders") || "[]");
    existing.unshift(order);
    localStorage.setItem("orders", JSON.stringify(existing));

    // Vider le panier
    dispatch(clearCart());

    // Succès
    setSubmitting(false);
    alert(`Commande enregistrée — ID: ${order.id} \nMerci pour votre achat !`);
    // Optionnel : rediriger vers confirmation ou page d'accueil
    // navigate(`/order-confirmation/${order.id}`);
    // Ici on reste sur la page mais le panier est vide
  };

  return (
    <div className="checkout-page">
      <h1 className="checkout-title">Finaliser la commande</h1>

      <div className="checkout-grid">
        {/* LEFT : FORM */}
        <form className="checkout-form" onSubmit={handleSubmit} noValidate>
          <section className="card">
            <h2>Informations de facturation</h2>

            <label>
              Nom complet
              <input
                name="fullName"
                value={form.fullName}
                onChange={handleChange}
                placeholder="Prénom Nom"
              />
              {errors.fullName && <small className="err">{errors.fullName}</small>}
            </label>

            <label>
              Email
              <input
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="exemple@domaine.com"
              />
              {errors.email && <small className="err">{errors.email}</small>}
            </label>

            <label>
              Téléphone
              <input
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="+229 60 00 00 00"
              />
              {errors.phone && <small className="err">{errors.phone}</small>}
            </label>

            <label>
              Adresse
              <input
                name="address"
                value={form.address}
                onChange={handleChange}
                placeholder="Rue, n°, quartier"
              />
              {errors.address && <small className="err">{errors.address}</small>}
            </label>

            <label>
              Ville
              <input
                name="city"
                value={form.city}
                onChange={handleChange}
                placeholder="Ex : Cotonou"
              />
              {errors.city && <small className="err">{errors.city}</small>}
            </label>

            <label>
              Note (optionnelle)
              <textarea
                name="note"
                value={form.note}
                onChange={handleChange}
                placeholder="Remarques pour la livraison..."
                rows="3"
              />
            </label>
          </section>

         
        </form>

        {/* RIGHT : SUMMARY */}
        <aside className="order-summary card">
          <h2>Récapitulatif de la commande</h2>

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
            Vos informations sont sécurisées. Les instructions de paiement seront
            envoyées après validation.
          </p>

           <section className="card payment-card">
            <h2>Méthode de paiement</h2>
            <p className="muted">
              Aucune méthode de paiement n’est encore configurée. Après validation,
              vous recevrez les instructions par e-mail pour le paiement (Mobile Money,
              PayDunya, Flutterwave, etc.) ou un agent vous contactera.
            </p>

            <div className="fake-payment">
              <label>
                <input type="radio" name="pay" defaultChecked /> Paiement différé /
                instructions (par défaut)
              </label>
            </div>
          </section>

          <div className="actions">
            <button type="submit" className="btn-primary" disabled={submitting}>
              {submitting ? "Validation..." : "Valider la commande"}
            </button>
          </div>
        </aside>
        
      </div>
    </div>
  );
}
