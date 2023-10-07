import React, { useEffect, useState } from 'react'
import { ImLocation2 } from "react-icons/im";
import {db} from '../firebase.config'
import {collection, getDoc, query, orderBy, limit, getDocs} from 'firebase/firestore'
import { useNavigate } from 'react-router-dom'
import Spinner from './Spinner'
import { Swiper, SwiperSlide } from 'swiper/react';
import {  Pagination, A11y, Autoplay } from 'swiper/modules';
import "../styles/slider.css"

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';

const Slider = () => {
    const [listings, setListings] =useState(null)
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()
    const userPic =
    "https://openclipart.org/download/247319/abstract-user-flat-3.svg";


    useEffect(()=>{
        const fetchListings = async () => {
            const listingRef = collection(db, "listings");
            const q = query(listingRef, orderBy("timestamp", "desc"), limit(5));
            const querySnap = await getDocs(q);
            let listings = [];
            querySnap.forEach((doc) => {
              return listings.push({
                id: doc.id,
                data: doc.data(),
              });
            });
            setLoading(false);
            setListings(listings);
          };
        fetchListings()
        // console.log(listings === null ? "loading" : listings);
    },[])

    if(loading) {
        return <Spinner />
    }
  return (
    <>
        <div className="container-fluid"> 
            {listings === null ? (
                    <Spinner />
                ) : ( 
                    <Swiper 
                    style={{cursor:'pointer'}}
                    effect={ 'coverflow'}
                    modules={[Pagination, A11y, Autoplay]}
                    spaceBetween={50}
                    slidesPerView={1}
                    autoplay ={{delay: 3000}}
                    pagination={{ clickable: true }}
                    className='mySwiper'
                    >
                    {listings.map(({data, id}) => (
                        <SwiperSlide 
                            key={id}
                            onClick={()=>{navigate(`/category/${data.type}/${id}`)}}
                        >
                            <div className="swiper-image-container home-swiper">
                                <div className="swiper-info">
                                    <ImLocation2 size={20} className="ms-2" /> Recently Added :{" "}
                                    <br />
                                    <span className="ms-4 mt-2"> {data.name}</span>
                                    <span className="ms-2">
                                        | Price ( $ {data.regularPrice} )
                                    </span>
                                </div>
                                <img
                                    src={data.imgUrls[0]}
                                    alt={data.name}
                                    className="slider-img"
                                />
                            </div>
                        </SwiperSlide>
                    ))}
                    </Swiper>
                )}
        </div>
    </>
)  
}

export default Slider