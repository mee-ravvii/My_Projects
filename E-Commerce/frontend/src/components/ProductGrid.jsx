import React from "react";
import { Link } from "react-router-dom";
import "../css/productGrid.css";
import { addToCart } from "../services/cartServices";


const ProductGrid = ({ products }) => {

  const addToCartId = async(id)=>{
    const data = await addToCart(id)
    alert(data.message)
  }


  return (
    <div className="products-container">

      {products.map((product) => {

        return (
          <article className="product-card" key={product._id}>

            {/* Product Image */}

            <div className="product-image-container">

              <img
                src={product.image}
                alt={product.title}
                className="product-image"
              />

              <button className="wishlist-btn">
                ♡
              </button>

            </div>


            {/* Product Information */}

            <div className="product-info">

              <p className="product-category">
                {product.category}
              </p>

              <h2 className="product-title">
                {product.title}
              </h2>


              {/* Rating */}

              <div className="product-rating">
                <span>★</span>
                <span>★</span>
                <span>★</span>
                <span>★</span>
                <span className="empty-star">★</span>
              </div>


              {/* Price */}

              <div className="product-price">
                ₹ {product.price}
              </div>


              {/* Actions */}

              <div className="product-actions">
  
                <button className="add-cart-btn" onClick={()=>{addToCartId(product._id)}}>
                  Add to Cart
                </button>         

                <Link
                  to={`/products/${product._id}`}
                  className="view-product-btn"
                >
                  View Details →
                </Link>

              </div>

            </div>

          </article>
        );

      })}

    </div>
  );
};

export default ProductGrid;