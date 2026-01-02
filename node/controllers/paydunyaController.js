const axios = require("axios");
require("dotenv").config();

const createInvoice = async (req, res) => {
  try {

    // console.log(req.body);
    const { items, amount, customer } = req.body;



    const payload = {
      invoice: {
        items: items.map((item) => ({
          name: item.name,
          quantity: item.quantity,
          unit_price: item.unit_price,
          total_price: item.total_price * item.quantity,
        })),
        total_amount: amount,
        description: "Paiement de votre commande",
      },
      store: {
        name: "Votre Boutique",
        tagline: "La qualité au meilleur prix",
      },
      actions: {
        callback_url: `${process.env.NGROK_URL}/api/paydunya/callback`,
        cancel_url: `${process.env.NGROK_URL}/cancel`,
        return_url: `${process.env.NGROK_URL}/success`,
      },
    };

    const headers = {
      "Content-Type": "application/json",
      "PAYDUNYA-MASTER-KEY": process.env.MASTER_KEY,
      "PAYDUNYA-PRIVATE-KEY": process.env.PRIVATE_KEY,
      "PAYDUNYA-PUBLIC-KEY": process.env.PUBLIC_KEY, // IMPORTANT !
      "PAYDUNYA-TOKEN": process.env.TOKEN,
    };

    const response = await axios.post(
      "https://app.paydunya.com/api/v1/checkout-invoice/create",
      payload,
      { headers }
    );
   console.log("Réponse PayDunya :", response.data);
    return res.json({
      payment_url: response.data.response, // CORRIGÉ
      invoice_token: response.data.token,
    });

  } catch (error) {
    console.error(error.response?.data || error);
    res.status(500).json({ message: "Erreur création facture PayDunya" });
  }
};

module.exports = { createInvoice };
