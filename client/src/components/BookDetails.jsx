import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Navbar from './Navbar';
import { loadStripe } from '@stripe/stripe-js';
import { useAuth } from '../context/AuthProvider'; // Imported useAuth from context
import { Elements } from '@stripe/react-stripe-js';

const stripePromise = loadStripe('pk_test_51PL3jNSFFZH0st0cHZH1lE0E5M3jDsQn9f13c38aGSpVozaNObjcUrHUdDkqqlH7qJhobMxv0HB5iGvPrBP4BdOp00PAyW2ny9');

const BookDetails = () => {
    const { id } = useParams();
    const [book, setBook] = useState(null);
    const [showAll, setShowAll] = useState(false);
    const [authUser] = useAuth(); // Used useAuth hook from context
    const [isSubscribed, setIsSubscribed] = useState(false); // Added state for subscription status

    useEffect(() => {
        const fetchBook = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/book/${id}`);
                setBook(response.data);
            } catch (error) {
                console.error('Error fetching book:', error);
            }
        };

        const checkSubscriptionStatus = async () => {
            if (authUser) {
                try {
                    const response = await axios.get(`http://localhost:3000/subscription-status/${authUser._id}/${id}`);
                    setIsSubscribed(response.data.isSubscribed);
                } catch (error) {
                    console.error('Error checking subscription status:', error);
                }
            }
        };

        fetchBook();
        checkSubscriptionStatus();
    }, [id, authUser]);;

    if (!book) {
        return <div>Loading...</div>;
    }

    const handlePayment = async () => {
        const response = await axios.post('http://localhost:3000/subscription/create-checkout-session', {
            userId: authUser._id,
            bookId: book._id,
            bookName: book.name,
            bookPrice: book.price
        });
        const { id } = response.data;

        const stripe = await stripePromise;
        const { error } = await stripe.redirectToCheckout({ sessionId: id });

        if (error) {
            console.error('Error redirecting to checkout:', error);
        }
    };

    const toggleShowAll = () => {
        if (isSubscribed) {
            setShowAll(!showAll);
        } else {
            alert('You need to be subscribed to see the full story.');
        }
    };

    const truncatedStory = showAll ? book.story : book.story.split(' ').slice(0, 50).join(' ');

    return (
        <div className="pt-16 pb-20 max-w-screen-2xl container mx-auto md:px-20 px-4">
            <Navbar />
            <div className="mt-8 flex flex-col items-center">
                <img src={book.img} alt="Book Cover" className="w-full max-w-lg mb-4 rounded-lg shadow-lg" />
                <h1 className="text-3xl font-semibold">{book.name}</h1>
                <h2 className="text-xl font-medium text-gray-700">{book.title}</h2>
                <p className="text-lg font-medium text-gray-600 mt-4">{truncatedStory}</p>
                {!showAll && (
                    <>
                        <button
                            className="text-blue-500 hover:underline mt-2"
                            onClick={toggleShowAll}
                        >
                            Read more...
                        </button>
                        {!isSubscribed && (
                            <button
                                className="text-white-500 btn bg-pink-500 mt-6 ml-4"
                                onClick={handlePayment}
                            >
                                Subscribe
                            </button>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default BookDetails;
