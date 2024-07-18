import React from 'react';
import { Link } from 'react-router-dom';

const Cards = ({ item }) => {
  return (
    <div className="mt-4 my-3 p-3">
      <div className="card w-92 bg-slate-50 shadow-xl hover:scale-105 duration-200 dark:bg-slate-900 dark:text-white dark:border">
        <figure className="h-50 w-full">
          <img className="h-48 w-full object-cover" src={item.img} alt="Book Cover" />
        </figure>
        <div className="card-body">
          <h2 className="card-title ">
            {item.name}
            <div className="badge badge-secondary">{item.category}</div>
          </h2>
          <p>{item.title}</p>
          <div className="card-actions justify-between">
            <div className="badge badge-outline">${item.price}</div>
            <Link to={`/book/${item._id}`}>
              <div className="cursor-pointer px-2 py-1 rounded-full border-[2px] hover:bg-pink-500 hover:text-white duration-200">
                View Details
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cards;
