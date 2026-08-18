import axios from 'axios'

export const getAllProducts = async () => {
    const response = await axios.get("http://localhost:3000/api/admin/fetch");
    console.log(response.data);
    return response.data;
}
export const getProductsById = async (id) => {
    const response = await axios.get(`http://localhost:3000/api/admin/fetch/${id}`);
    // console.log(response.data);
    return response.data;
};

export const addProduct = async(productData)=>{
    const response = await axios.post(`http://localhost:3000/api/admin/add`,productData);
    console.log(response.data);
    return response.data;  
}


export const updateProduct = async (id,productData) => {
    console.log(id);
    console.log(productData);
    
    const response = await axios.put(`http://localhost:3000/api/admin/update/${id}`,{
        title : productData.title,
        price : productData.price,
        description : productData.description,
        category : productData.category,
        rate : productData.rate,
        count : productData.count,
        image : productData.image,
    });

    console.log(response);
    return response.data;
};

export const deleteProduct = async(id)=>{
    console.log(id);
    
    const response = await axios.delete(`http://localhost:3000/api/admin/delete/${id}`)
    console.log(response);
    return response.data;

}