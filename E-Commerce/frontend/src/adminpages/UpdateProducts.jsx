import React, { useState,useEffect } from 'react'
import { getAllProducts, getProductsById, updateProduct } from '../services/adminServices';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import '../css/updateProducts.css'

const UpdateProducts = () => {

    const navigate = useNavigate()

    const [product, setProduct] = useState({});
    const[updatedProduct , setUpdatedProduct] = useState({
        title : "",
        price : 0 ,
        description : "", 
        image : "",
        category : "",
        rate : 0,
        count : 0,
    })

    const {id} = useParams();
    // console.log(id);

    useEffect(() => {

        const fetchByID = async () =>{
            const data = await getProductsById(id);
            const product = data.product;

            setUpdatedProduct({
                title: product.title,
                price: product.price,
                description: product.description,
                image: product.image,
                category: product.category,
                rate: product.rating?.rate || "",
                count: product.rating?.count || ""
            });
        }
        fetchByID();
    },[id])
    const handleUpdate = async()=>{
        const data = await updateProduct(id,updatedProduct)
        console.log(data); 
        navigate('/admin/products');   
    }
    return (
    <>
        <div className="update-product-page">

            <label htmlFor="title">Title</label>
            <input
                id="title"
                type="text"
                onChange={(e) => {
                    setUpdatedProduct({
                        ...updatedProduct,
                        title: e.target.value
                    })
                }}
                placeholder="Enter Title"
                value={updatedProduct.title}
            />


            <label htmlFor="price">Price</label>
            <input
                id="price"
                type="number"
                onChange={(e) => {
                    setUpdatedProduct({
                        ...updatedProduct,
                        price: e.target.value
                    })
                }}
                placeholder="Enter Price"
                value={updatedProduct.price}
            />


            <label htmlFor="description">Description</label>
            <input
                type='text'
                id="description"
                onChange={(e) => {
                    setUpdatedProduct({
                        ...updatedProduct,
                        description: e.target.value
                    })
                }}
                placeholder="Enter Description"
                value={updatedProduct.description}
            />


            <label htmlFor="category">Category</label>
            <input
                id="category"
                type="text"
                onChange={(e) => {
                    setUpdatedProduct({
                        ...updatedProduct,
                        category: e.target.value
                    })
                }}
                placeholder="Enter Category"
                value={updatedProduct.category}
            />


            <label htmlFor="image">Image</label>
            <input
                id="image"
                type="text"
                onChange={(e) => {
                    setUpdatedProduct({
                        ...updatedProduct,
                        image: e.target.value
                    })
                }}
                placeholder="Enter Image URL"
                value={updatedProduct.image}
            />


            <label htmlFor="rate">Rating</label>
            <input
                id="rate"
                type="number"
                step="0.1"
                onChange={(e) => {
                    setUpdatedProduct({
                        ...updatedProduct,
                        rate: e.target.value
                    })
                }}
                placeholder="Enter Rating"
                value={updatedProduct.rate}
            />


            <label htmlFor="count">Rating Count</label>
            <input
                id="count"
                type="number"
                onChange={(e) => {
                    setUpdatedProduct({
                        ...updatedProduct,
                        count: e.target.value
                    })
                }}
                placeholder="Enter Count"
                value={updatedProduct.count}
            />


            <button
                className="update-product-btn"
                onClick={handleUpdate}
            >
                Update Product
            </button>

        </div>
    </>
  )
}

export default UpdateProducts