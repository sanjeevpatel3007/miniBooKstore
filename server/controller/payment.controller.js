// const Stripe = require('stripe');
import Stripe from "stripe";
import User from "../modal/user.modal.js";
const stripe = Stripe("sk_test_51PL3jNSFFZH0st0ccs1s1UXGUFgHWv1laefmJxiOANAqspivvgUiUhsiIJnTolZY8HRQ7BDbvyh1DAtUI3FKVjrJ00AHSAWqUi");



const payment= async(req,res)=>{
    const { bookId, bookName, bookPrice } = req.body;

    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [{
            price_data: {
                currency: 'usd',
                product_data: {
                    name: bookName,
                },
                unit_amount: bookPrice,
            },
            quantity: 1,
        }],
        mode: 'payment',
        success_url: `http://localhost:5173/success?bookId=${bookId}&bookName=${encodeURIComponent(bookName)}&bookPrice=${bookPrice}`,
        cancel_url: 'http://localhost:5173/cancel',
    });
    
    
        res.json({ id: session.id });
    
}

const isSubcribe = async (req, res) => {
    const { userId, bookId } = req.body;
    try {
        const user = await User.findById(userId);
        if (!user.subscriptions.includes(bookId)) {
            user.subscriptions.push(bookId);
            user.isSubscribed = true; // You can add additional checks here if needed
        }
        await user.save();
        res.status(200).json({ message: 'Subscription updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error updating subscription status', error });
    }
}

export {payment ,isSubcribe}