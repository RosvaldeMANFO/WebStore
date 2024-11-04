const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

require("dotenv").config("./.env");

const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors({ origin: true, credentials: true }));

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const YOUR_DOMAIN = "http://localhost:4242";

app.post("/checkout", async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    line_items: req.body.items.map((item) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: item.name,
          images: [item.product],
        },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity,
    })),
    mode: "payment",
    success_url: `${YOUR_DOMAIN}/success.html`,
    cancel_url: `${YOUR_DOMAIN}/cancel.html`,
  });

  res.status(200).json(session);
});

app.listen(4242, () => console.log("Running on port 4242"));
