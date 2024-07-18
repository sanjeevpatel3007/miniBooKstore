import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function About() {
  return (
    <div className="max-w-screen-2xl pt-16 md:px-20   dark:bg-slate-700 dark:text-white">
      <Navbar />

      <div className="about pt-10 pb-20 px-4 md:px-0">
        <h1 className="text-4xl font-bold mb-8 text-center">Discover Our Story</h1>
        <p className="text-lg leading-relaxed mb-6 text-center">
          Welcome to BookStore, where our passion for literature and education drives everything we do. Our journey began with a simple mission: to bring the joy of reading to everyone, everywhere. 
        </p>
        <p className="text-lg leading-relaxed mb-6 text-center">
          Founded in [year], BookStore started as a small initiative with a big dream – to make quality books accessible to all. Over the years, we've grown into a thriving community of book lovers, educators, and learners, united by our shared love for literature and learning.
        </p>
        <p className="text-lg leading-relaxed mb-6 text-center">
          Our mission is simple yet profound: to foster a love for reading and lifelong learning. We are committed to curating a diverse collection of books that cater to every interest, age group, and reading level.
        </p>
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold mb-4">Our Values</h2>
          <ul className="text-lg leading-relaxed">
            <li className="mb-2">
              <span className="font-bold">Accessibility:</span> We believe that everyone should have access to quality education and literature, regardless of their background or financial status. That's why we work tirelessly to make our books affordable and accessible to all.
            </li>
            <li className="mb-2">
              <span className="font-bold">Community:</span> We believe in the power of community and the importance of fostering meaningful connections through literature. We're proud to be a part of a vibrant community of readers, writers, and educators who share our passion for books.
            </li>
            <li className="mb-2">
              <span className="font-bold">Quality:</span> We are committed to excellence in everything we do, from the selection of our books to the service we provide to our customers. We believe in the importance of quality literature and strive to offer only the best to our readers.
            </li>
          </ul>
        </div>
        <p className="text-lg leading-relaxed text-center">
          Behind BookStore is a dedicated team of book enthusiasts, educators, and professionals, all united by a common goal: to make a difference through literature. Get to know the faces behind the books and learn more about the individuals who are passionate about bringing the joy of reading to the world.
        </p>
      </div>

      <Footer />
    </div>
  );
}
