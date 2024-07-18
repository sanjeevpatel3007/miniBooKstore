import React from 'react'
import { useState,useEffect } from 'react';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Cards from './Cards';
import axios from 'axios'



export default function Freebook() {

    const [allBooks, setBook] = useState([])
    useEffect(() => {
        const getBook = async () => {
            try {
                const res = await axios.get("http://localhost:3000/book");
                //    console.log(res.data)
                setBook(res.data)
            } catch (error) {
                console.log(error)
            }
        }
        getBook();
    }, [])
const freebooks = allBooks.filter((item) => item.category === "Free")



    var settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 3,
        initialSlide: 0,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };
    //    console.log(filterData)
    return (
        <div>
            <div className=" max-w-screen-2xl container mx-auto md:px-20 px-4  ">

            <div>
          <h1 className="font-semibold text-xl pb-2">Free Offered Courses</h1>
          <p>
          Expand your knowledge with our selection of free courses. 
          From literature to technology, 
          there's something for every interest.
          </p>
        </div>


                <div className="mt-10">
                    <Slider {...settings}>

                        {freebooks.map((item) => (
                            <Cards item={item} key={item.id} />

                        ))}

                    </Slider>
                </div>

            </div>

        </div>
    )
}

