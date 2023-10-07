import React from 'react'
import { Link } from 'react-router-dom'
import { FaBed, FaBath} from 'react-icons/fa'
import { GiTakeMyMoney } from "react-icons/gi";
import "../styles/listingItem.css";

const ListingItem = ({listing, id, onDelete, onEdit}) => {

  return (
    <>
        <div className="card-item-parent d-flex align-items-center justify-content-center m-3">
            <div className="item-card category-link mb-2 w-75" style={{ width: '800px'}}>
                <Link to={`/category/${listing.type}/${id}`}>
                    <div className="row container p-2">
                            <div className="col-md-5 item-card-continer1">
                                <img 
                                    src={listing.imgUrls[0]} 
                                    className="img-thumbnail"
                                    alt={listing.name} 
                                    height={200}
                                    width={300}
                                />
                            </div>
                            <div className="col-md-5 item-card-continer2">
                                <p>{listing.location}</p>
                                <h2>{listing.name}</h2>
                                <p>
                                    <GiTakeMyMoney /> RS :{" "}
                                    {listing.offer
                                        ? listing.discountedPrice
                                        : listing.regularPrice}{" "}
                                    {listing.type === "rent" && " / Month"}
                                </p>
                                <p>
                                    <FaBed /> &nbsp;
                                    {listing.bedrooms > 1
                                    ? `${listing.bedrooms} bedrooms`
                                    :'1 bedrooms'}
                                </p>
                                <p>
                                    <FaBath /> &nbsp;
                                    {listing.bathrooms > 1
                                    ? `${listing.bathrooms} bathrooms`
                                    :'1 bathrooms'}
                                </p>
                                {onDelete && (
                                    <button 
                                        className="btn btn-danger" 
                                        onClick={()=>{onDelete(listing.id, listing.name)}}
                                    >
                                        DELETE
                                    </button>
                                )}
                                {onEdit && (
                                    <button 
                                        className="btn btn-info ms-3" 
                                        onClick={()=>{onEdit(listing.id)}}
                                    >
                                        Edit
                                    </button>
                                )}
                            </div>
                    </div>
                </Link>
            </div>
        </div>
    </>
  )
}

export default ListingItem