import React, { useState, useEffect, Fragment } from "react";
import FooterFront from '../shared/FooterFront';
import HeaderSignedInClient from '../shared/HeaderSignedInClient';
import axios from "axios";
import "./stylesproduct.css"



const Products = () => {
    const [productList, setProductList] = useState([]);
    //const [searchTerm, setSearchTerm] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
  


     useEffect(() => {
    fetchProductList();
  }, []);

  const fetchProductList = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/sc/all");
      setProductList(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  const filteredProducts = productList.filter((value) =>
  value.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
  value.price && 
  value.dprice && 
  value.imageUrl
).sort((a, b) => {
  const dpriceA = a.dprice ? a.dprice : ''; // Vérifier si dprice est null
  const dpriceB = b.dprice ? b.dprice : ''; // Vérifier si dprice est null
  return dpriceA.localeCompare(dpriceB);
});

    
   
  
 



    
    return (
        
            

            <div className="main-content right-chat-active">
                
    <HeaderSignedInClient/>
    <div className="slider-area2">
        <div className="slider-height2 d-flex align-items-center">
          <div className="container">
            <div className="row">
              <div className="col-xl-12">
                <div className="hero-cap hero-cap2 pt-70">
                  <h2>PRODUCTS RECOMMENDATION</h2>
                  <div className="search-container">
                    <input
                      type="text"
                      placeholder="Type product name here"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      style={{ width: "300px", padding: "10px" }}
                    />
                    <button className="fetch-btn buttonp" onClick={fetchProductList}>Fetch Products</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <h3 class="white-text">Here are our suggestions for products available in Tunisia at the best prices:</h3>
      </div>
    
     
     
    
         
      <div className="middle-sidebar-bottom">
                    <div
                        className="middle-sidebar-left pe-0"
                        style={{ maxWidth: "100%" }}
                    >
                      
                        <div className="row">
                            <div className="col-xl-12">
                                
                                <div className="row ps-2 pe-2">
                                
                                {filteredProducts.map((value, index) => (
                                        <div
                                            key={index}
                                            className="col-lg-6 col-md-6 col-sm-6 mb-3 pe-2 ps-2"
                                        >

                                            <div className="card w-100 p-0 hover-card shadow-xss border-0 rounded-3 overflow-hidden me-1">
                                               
                                                <div className="card-image w-100 mb-3" style={{ height: '100%' }} >

                                                    <a
                                                       
                                                        className="position-relative d-block"
                                                    >
                                                        <img
    src={value.imageUrl}
    alt="Product"
    onError={(e) => { e.target.onerror = null;  }}
    style={{ height: '300px', width: '100%', objectFit: 'contain' }}
/>

                                                    </a>
                                                </div>
                                                <div className="card-body pt-0">
                                                    <i className="feather-bookmark font-md text-grey-500 position-absolute right-0 me-3"></i>
                                                    <h2 className="fw-700 font-xss mt-0 lh-28 mb-0">
                                                        <a
                                                            
                                                            className="text-light text-red-500"
                                                        >
                                                            {value.name}

                                                        </a>
                                                    </h2>

                                                    
                                                    <h4 className="fw-700 font-xss mt-0 lh-28 mb-0">
                                                        <strong >price  :</strong>
                                                        <span className="text-grey-500 "> {value.price}</span>
                                                    </h4>
                                                    


                                                    <h3 className="price mt-2">
                                                        
                                                        <span className="font-xssss fw-700 me-1">
                                                        <strong>price after discount :</strong>
                                                        <span className="text-danger"> {value.dprice} </span>
                                                        </span>

                                                    </h3>
                                                    {console.log(value.imageUrl)}
                                                    <button
  className="genric-btn primary radius"
  style={{
    fontSize: '15px',
    padding: '5px 10px',
    display: 'flex',
    backgroundColor: 'grey',
    justifyContent: 'center',
  }}
  onClick={() => window.location.href = value.url}
>
  Show Details
</button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}

                                </div>
                            </div>
                        </div>

                    </div>
                </div>
             
                <FooterFront/>
            </div>
           
      
    );
};


export default Products;