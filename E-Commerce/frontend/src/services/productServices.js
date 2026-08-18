import axios from 'axios'

export const getAllProducts = async()=>{
    const res = await axios.get('http://localhost:3000/products');
    return res.data;
}

export const getProductsById = async(id)=>{
    const res = await axios.get(`http://localhost:3000/products/${id}`);
    return res.data;
}

export const getProductsByCategory = async(category)=>{
    const res = await axios.get(`http://localhost:3000/products?category=${category}`)
    return res.data
}
export const getProductsBySearch = async(search)=>{
    const res = await axios.get(`http://localhost:3000/products?title=${search}`);
    return res.data;
}
export const getProductsByCategoryAndSearch = async(category, search)=>{
    const res = await axios.get(`http://localhost:3000/products?category=${category}&&title=${search}`);    
    return res.data
}
