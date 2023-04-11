const express = require('express');
var cors = require('cors');
const stripe = require('stripe')('sk_test_51MSE3QSIgz3IDkn0slEWIyO1earJUN6YNHIRkL9v9To9qOrBaAs5sueDOtImDrIgyHedHOhjMIQYoYzupcjlbPYI00U8FM2kLR');

const app = express();
app.use(cors());
app.use(express.static("public"));
app.use(express.json());

app.post("/checkout", async (req, res) => {
    console.log(req.body);
    const items = req.body.items;
    let lineItems = [];
    items.forEach((item)=> {
        lineItems.push(
            {
                price: item.id,
                quantity: item.quantity
            }
        )
    });

    const session = await stripe.checkout.sessions.create({
        line_items: lineItems,
        mode: 'payment',
        success_url: "http://localhost:3000/success",
        cancel_url: "http://localhost:3000/cancel"
    });

    res.send(JSON.stringify({
        url: session.url
    }));
});

app.listen(4000, () => console.log("Listening on port 4000!"));