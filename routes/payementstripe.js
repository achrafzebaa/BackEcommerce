const express = require('express');
const router = express.Router();
const stripe = require ('stripe');
const Stripe =stripe('sk_test_51QYU8jEot9yRphS1aiMzk9JBtI85SfSSaGO0858n3H986W4oceFcm6ozefvuepXBlVGlufc0rHGbFvyDc8jDhkdf00mK3rqdbX');
// Remplacez par votre clé secrète Stripe
router.post('/', async (req, res) => { console.log(req.body)
let status, error;

const { token, amount } = req.body;
try {
await Stripe.charges.create({
source: token.id,
amount,
currency: 'usd',
});
status = 'success';
} catch (error) {
console.log(error);
status = 'Failure';
}
res.json({ error, status });
});
module.exports = router;