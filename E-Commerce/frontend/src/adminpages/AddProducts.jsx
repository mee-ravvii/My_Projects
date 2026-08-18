import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addProduct } from "../services/adminServices";
import "../css/addProducts.css";

const AddProduct = () => {

  const navigate = useNavigate();

  const [productData, setProductData] = useState({
    title: "",
    price: "",
    description: "",
    category: "",
    rate: "",
    count: "",
    image: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setProductData({
      ...productData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      const response = await addProduct(productData);

      console.log(response);
      navigate("/admin/products");

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="add-product-container">

      <div className="add-product-form">

        <div className="form-heading">
            <div className="add-product-icon">✨</div>

            <div>
            <h1>Add New Product</h1>
            <p>Fill in the details to add a new product to your store.</p>
            </div>
        </div>

        <form onSubmit={handleSubmit}>

            {/* Title */}
            <div className="form-group">
            <label htmlFor="title">🏷️ Product Title</label>

            <input
                type="text"
                id="title"
                name="title"
                value={productData.title}
                onChange={handleChange}
                placeholder="e.g. Premium Cotton T-Shirt"
                required
            />
            </div>


            {/* Price */}
            <div className="form-group">
            <label htmlFor="price">💰 Price</label>

            <input
                type="number"
                id="price"
                name="price"
                value={productData.price}
                onChange={handleChange}
                placeholder="Enter product price"
                required
            />
            </div>


            {/* Description */}
            <div className="form-group">
            <label htmlFor="description">📝 Description</label>

            <textarea
                id="description"
                name="description"
                value={productData.description}
                onChange={handleChange}
                placeholder="Write something about your product..."
                required
            />
            </div>


            {/* Category */}
            <div className="form-group">
            <label htmlFor="category">📂 Category</label>

            <select
                id="category"
                name="category"
                value={productData.category}
                onChange={handleChange}
                required
            >
                <option value="">Choose a category</option>
                <option value="electronics">💻 Electronics</option>
                <option value="jewelery">💎 Jewelery</option>
                <option value="men's clothing">👕 Men's Clothing</option>
                <option value="women's clothing">👗 Women's Clothing</option>
            </select>
            </div>


            {/* Rating + Count */}
            <div className="form-row">

            <div className="form-group">
                <label htmlFor="rate">⭐ Rating</label>

                <input
                type="number"
                id="rate"
                name="rate"
                value={productData.rate}
                onChange={handleChange}
                placeholder="0 - 5"
                min="0"
                max="5"
                step="0.1"
                required
                />
            </div>

            <div className="form-group">
                <label htmlFor="count">📦 Stock Count</label>

                <input
                type="number"
                id="count"
                name="count"
                value={productData.count}
                onChange={handleChange}
                placeholder="Available quantity"
                min="0"
                required
                />
            </div>

            </div>


            {/* Image */}
            <div className="form-group">
            <label htmlFor="image">🖼️ Product Image</label>

            <input
                type="text"
                id="image"
                name="image"
                value={productData.image}
                onChange={handleChange}
                placeholder="Paste product image URL"
                required
            />
            </div>


            <button type="submit" className="submit-product-btn">
            ✨ Add Product
            </button>

        </form>

        </div>

    </div>
  );
};

export default AddProduct;