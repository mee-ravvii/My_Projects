import React from 'react'
import { useEffect, useState } from 'react'
import { getCartItems } from '../services/cartServices';
import '../css/cart.css'

const Cart = () => {

    const [cartData, setCartData] = useState([]);

    useEffect(() => {

        const fetchCart = async () => {

            const cartItems = await getCartItems();

            setCartData(cartItems);
        }

        fetchCart();

    }, []);


    return (
        <div className="cart-container">

            {cartData.map((cart) => {

                const product = cart.productId;
                if (!product) {
                return null;
            }

                return (

                    <div className="cart" key={cart._id}>

                        {/* Product Image */}

                        <img
                            className="cart-image"
                            src={product.image}
                            alt={product.title}
                        />


                        {/* Product Information */}

                        <div className="cart-info">

                            <div className="cart-category">
                                {product.category}
                            </div>

                            <h2 className="cart-title">
                                {product.title}
                            </h2>

                            <div className="cart-price">
                                ₹ {product.price}
                            </div>

                        </div>


                        {/* Quantity */}

                        <div className="quantity-section">

                            <span className="quantity-label">
                                Quantity
                            </span>

                            <div className="quantity-control">

                                <button>
                                    -
                                </button>

                                <span className="quantity-value">
                                    {cart.quantity}
                                </span>

                                <button>
                                    +
                                </button>

                            </div>

                        </div>

                    </div>

                )

            })}

        </div>
    )
}

export default Cart