import axios from 'axios';

export const loginUser = async(userData) => {
    console.log("Inside user auth");
    const response = await axios.post('http://localhost:3000/login',{
        email:userData.email,
        password:userData.password,
    });
    console.log(response.data);
    return response.data;
}
export const RegisterUser = async(userData) => {
    console.log("Inside user auth");
    const response = await axios.post('http://localhost:3000/register',{
        name : userData.name,
        email:userData.email,
        password:userData.password,
    });
    console.log(response.data);
    return response.data;
}