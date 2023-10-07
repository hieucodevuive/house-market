import React, {useState, useEffect} from 'react'
import Layout from '../components/layout/Layout'
import {getDoc, doc} from 'firebase/firestore'
import {db} from '../firebase.config'
import { getAuth } from 'firebase/auth'
import { useNavigate, Link, useParams } from 'react-router-dom'
import Spinner from '../components/Spinner'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, A11y, EffectCoverflow } from 'swiper/modules';
import "../styles/listing.css";
import {
  FaBed,
  FaBath,
  FaParking,
  FaHouseDamage,
  FaArrowCircleRight,
} from "react-icons/fa";

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';

const Listing = () => {
  const [listing, setListing] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const params = useParams();
  const auth = getAuth();

  useEffect(() => {
    const fetchListing = async () => {
      const docRef = doc(db, "listings", params.listingId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setListing(docSnap.data());
        setLoading(false);
      }
    };
    fetchListing();
  }, [params.listingId]);

  if (loading) {
    return <Spinner />;
  }

  return (
    <Layout title={listing.name}>
      <div className="row listing-container">
        <div className="col-md-8 listing-container-col1">
         {listing.imgUrls === undefined ? (
                <Spinner />
              ) : ( 
                <Swiper
                  effect={ 'coverflow'}
                  modules={[ Pagination, A11y, EffectCoverflow]}
                  spaceBetween={50}
                  slidesPerView={1}
                  pagination={{ clickable: true }}
                  className='mySwiper'
                  coverfloweffect={{
                    rotate: 30,  // Đổi giá trị rotate
                    stretch: 10, // Đổi giá trị stretch
                    depth: 100,  // Đổi giá trị depth
                    modifier: 1, // Đổi giá trị modifier
                    slideShadows: true,
                  }}
                >
                  {listing.imgUrls.map((url, index) => (
                  <SwiperSlide key={index}>
                    <div className="swiper-image-container listing-swiper">
                      <img
                        src={listing.imgUrls[index]}
                        alt={listing.name}
                      />
                    </div>
                  </SwiperSlide>
                ))}
                </Swiper>
              )} 
        </div>
        <div className="col-md-4 listing-container-col2">
          <h3>{listing.name}</h3>
          <h6>
            Price :{" "}
            {listing.offer ? listing.discountedPrice : listing.regularPrice} /
            RS
          </h6>
          <p>Property For : {listing.type === "rent" ? "Rent" : "Sale"}</p>
          <p>
            {listing.offer && (
              <span>
                {listing.regularPrice - listing.discountedPrice} Discount
              </span>
            )}
          </p>
          <p>
            <FaBed size={20} /> &nbsp;
            {listing.bedrooms > 1
              ? `${listing.bedrooms} Bedrooms`
              : "1 Bedroom"}
          </p>
          <p>
            <FaBath size={20} /> &nbsp;
            {listing.bathrooms > 1
              ? `${listing.bathrooms} bathrooms`
              : "1 Bathroom"}
          </p>
          <p>
            <FaParking size={20} /> &nbsp;
            {listing.parking ? `Parking spot` : "no spot for parking"}
          </p>
          <p>
            <FaHouseDamage size={20} /> &nbsp;
            {listing.furnished ? `furnished house` : "not furnished"}
          </p>
          <Link
            className="btn btn-success"
            to={`/contact/${listing.useRef}?listingName=${listing.name}`}
          >
            Contact Landlord <FaArrowCircleRight size={20} />
          </Link>
        </div>
      </div>
    </Layout>
      
  );
};

export default Listing;