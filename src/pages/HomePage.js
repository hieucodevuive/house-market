import React from 'react'
import {useNavigate} from 'react-router-dom'
import Layout from './../components/layout/Layout'
import Slider from '../components/Slider'
import "../styles/homepage.css"

const HomePage = () => {
  const navigate = useNavigate()
  const img1 = 
    "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHByb3BlcnR5fGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60"
  const img2 = 
    "https://plus.unsplash.com/premium_photo-1663089688180-444ff0066e5d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzF8fHByb3BlcnR5fGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60"
  return (
    <Layout> 
        <div className="container mt-3">
          <Slider />
          <div className="home-cat row d-flex align-items-center justify-content-center">
            <h1>Category</h1>
            <div className="col-md-5 ">
              <div className="Imagecontainer">
                <img src={img1} alt="Rent" style={{ width: "100%" }} />
                <button className="btn" onClick={() => navigate("/category/rent")}>
                  FOR RENT
                </button>
              </div>
            </div>
            <div className="col-md-5">
              <div className="Imagecontainer">
                <img src={img2} alt="Rent" style={{ width: "100%" }} />
                <button className="btn" onClick={() => navigate("/category/sale")}>
                  FOR SALE
                </button>
              </div>
            </div>
          </div>
        </div>
    </Layout>
  )
}

export default HomePage