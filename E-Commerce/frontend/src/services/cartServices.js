import axios from "axios";

export const getCartItems =  async()=>{

    console.log(localStorage.getItem('token'));
    const response = await axios.get(`http://localhost:3000/cart`,{

        headers:{

            authorization : `Bearer ${localStorage.getItem('token')}`
        }
    });
    return response.data.cartItems;
}

export const addToCart = async(id)=>{
    console.log(id)
    const response = await axios.post(`http://localhost:3000/cart`,{
        productId:id
        },
        {
         headers:{
            authorization : `Bearer ${localStorage.getItem('token')}`
        }
        }
    );
    return response.data
}