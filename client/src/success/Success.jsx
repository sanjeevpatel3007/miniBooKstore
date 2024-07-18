import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthProvider'; // Imported useAuth from context

export default function Success() {
    const location = useLocation();
    const navigate = useNavigate();
    const [authUser, setAuthUser] = useAuth(); // Used useAuth hook from context
    const { bookId } = useParams(); // Extract bookId from URL params
    const [bookName, setBookName] = useState('');
    const [bookPrice, setBookPrice] = useState('');

    useEffect(() => {
        const updateSubscriptionStatus = async () => {
            try {
                await axios.post('http://localhost:3000/user/update-subscription-status', {
                    userId: authUser._id,
                    // bookId,
                });
                // Update local storage and auth context
                const updatedUser = { ...authUser, subscriptions: [...authUser.subscriptions, bookId], isSubscribed: true };
                setAuthUser(updatedUser);
                localStorage.setItem('Users', JSON.stringify(updatedUser));
            } catch (error) {
                console.error('Error updating subscription status:', error);
            }
        };

        const queryParams = new URLSearchParams(location.search);
        const bookName = queryParams.get('bookName');
        const bookPrice = queryParams.get('bookPrice');
        const bookId= queryParams.get('bookId');
       

        setBookName(bookName);
        setBookPrice(bookPrice);

        updateSubscriptionStatus();
    }, [bookId, location.search]); // Assuming bookId is defined in your component

    const handleReadBook = () => {
        navigate(`/book/${bookId}`);
    };

    return (
        <div>
            <Navbar />
            <div className='pt-36 pb-24 text-center'>
                <h1 className='text-4xl font-bold'>Thank you for your purchase!</h1>
                <div className="pt-16 max-w-screen-2xl container mx-auto md:px-20 px-4">
                    <h1 className="text-3xl font-semibold">Subscription Successful!</h1>
                    <p className="text-lg font-medium text-gray-600 mt-4">Thank you for subscribing to <strong>{bookName}</strong>.</p>
                    <p className="text-lg font-medium text-gray-600 mt-2">Book ID: {bookId}</p>
                    <p className="text-lg font-medium text-gray-600 mt-2">Price: ${bookPrice / 100}</p> {/* Assuming bookPrice is in cents */}
                </div>
                <button
                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
                    onClick={handleReadBook}
                >
                    Read the Book
                </button>
            </div>
            <Footer />
        </div>
    );
}
