import React, { useEffect, useState } from 'react';
import { addToCart } from "../services/cartServices";
import { useParams, Link } from 'react-router-dom';
import {
    ArrowLeft,
    Heart,
    ShoppingCart,
    Star,
    Plus,
    Minus
} from 'lucide-react';

import { getProductsById } from '../services/productServices';
import '../css/productDetails.css';



const ProductDetails = ({products}) => {



    const [product, setProducts] = useState({});
    const [quantity, setQuantity] = useState(1);

    const { id } = useParams();

    const handleAddToCart = async () => {

    const token = localStorage.getItem("token");

    if (!token) {
        navigate("/login");
        return;
    }

    try {

        await addToCart(product._id, 1);

        console.log("Product added to cart");

    } catch (error) {
        console.log(error);
    }
};

    useEffect(() => {

        const fetchDataById = async () => {

            try {

                const data = await getProductsById(id);

                setProducts(data.product);

            } catch (error) {

                console.log(error.message);

            }

        };

        fetchDataById();

    }, [id]);


    const increaseQuantity = () => {
        setQuantity(prev => prev + 1);
    };


    const decreaseQuantity = () => {

        if (quantity > 1) {
            setQuantity(prev => prev - 1);
        }

    };


    return (

        <div className="product-details-page">


            {/* BACK BUTTON */}

            <Link
                to="/"
                className="back-products-btn"
            >
                <ArrowLeft size={18} />
                Back to Products
            </Link>



            {/* PRODUCT DETAILS CONTAINER */}

            <div className="product-details-container">


                {/* PRODUCT IMAGE */}

                <div className="details-image-section">

                    <div className="details-image-box">

                        <button className="details-wishlist-btn">
                            <Heart size={22} />
                        </button>


                        <img
                            src={product.image}
                            alt={product.title}
                            className="details-product-image"
                        />

                    </div>

                </div>



                {/* PRODUCT INFORMATION */}

                <div className="details-info">


                    {/* CATEGORY */}

                    <p className="details-category">
                        {product.category}
                    </p>



                    {/* TITLE */}

                    <h1 className="details-title">
                        {product.title}
                    </h1>



                    {/* RATING */}

                    <div className="details-rating">

                        <div className="details-stars">

                            <Star size={17} fill="currentColor" />
                            <Star size={17} fill="currentColor" />
                            <Star size={17} fill="currentColor" />
                            <Star size={17} fill="currentColor" />
                            <Star size={17} />

                        </div>

                        <span>
                            4.2
                        </span>

                        <span className="rating-divider">
                            |
                        </span>

                        <span>
                            120 Reviews
                        </span>

                    </div>



                    {/* PRICE */}

                    <div className="details-price">

                        ₹ {product.price}

                    </div>



                    {/* DESCRIPTION */}

                    <div className="details-description">

                        <h3>
                            Product Description
                        </h3>

                        <p>
                            {product.description}
                        </p>

                    </div>



                    {/* QUANTITY */}

                    <div className="quantity-section">

                        <span>
                            Quantity
                        </span>


                        <div className="quantity-control">

                            <button
                                onClick={decreaseQuantity}
                            >
                                <Minus size={16} />
                            </button>


                            <span>
                                {quantity}
                            </span>


                            <button
                                onClick={increaseQuantity}
                            >
                                <Plus size={16} />
                            </button>

                        </div>

                    </div>



                    {/* ACTION BUTTONS */}

                    <div className="details-actions">


                        <button className="add-to-cart-details" onClick={()=>{addToCartId(product._id)}}>

                            <ShoppingCart size={20} />

                            Add to Cart

                        </button>


                        <button className="details-heart-btn">

                            <Heart size={21} />

                        </button>


                    </div>


                </div>

            </div>

        </div>

    );

};


export default ProductDetails;