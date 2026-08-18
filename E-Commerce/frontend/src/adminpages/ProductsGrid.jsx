import React, { useEffect, useState } from "react";
import { deleteProduct, getAllProducts } from "../services/adminServices";
import { Link } from "react-router-dom";
import "../css/adminProductGrid.css";

const ProductGrid = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        let data = await getAllProducts();
        setProducts(data.products);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      const response = await deleteProduct(id);

      console.log(response);
      console.log("Product Deleted Successfully");

      setProducts((prevProducts) =>
        prevProducts.filter((product) => product._id !== id)
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="admin-products-container">

      <div className="products-header">
        <div>
          <h1>Products</h1>
          <p>Manage your store products</p>
        </div>

        <Link to="/admin/products/add" className="add-product-btn">
          + Add Product
        </Link>
      </div>


      <div className="products-grid">
        {products.map((product) => (
          <div className="product-card" key={product._id}>

            <img
              src={product.image}
              alt={product.title}
            />

            <h5>{product.title}</h5>

            <p>£{product.price}</p>

            <Link
              className="admin-update-link"
              to={`/admin/products/update/${product._id}`}
            >
              Update
            </Link>

            <button
              className="admin-delete-btn"
              onClick={() => handleDelete(product._id)}
            >
              Delete
            </button>

          </div>
        ))}
      </div>

    </div>
  );
};

export default ProductGrid;