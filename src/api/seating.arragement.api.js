import axios from "axios";


const url = import.meta.env.VITE_APP_API_URL;


export async function fetchAllSeatingArrangement() {
  try {
    const response = await axios.get(`${url}/seatings`);
    return response.data;
  } catch (error) {
    console.error("Error:", error);
  }
}

export async function getSeatingById(id){
  try {
    console.log(id);
    const response = await axios.get(`${url}/seatings/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error:", error);
  }
}

export async function saveSeating(data){
  try {
    console.log(data);
    const response = await axios.post(`${url}/seatings`,data);
    return response.data;
  } catch (error) {
    console.error("Error:", error);
  }
}


  
export async function removeSeatingById(id) {
  try {
    const response = await axios.delete(`${url}/seatings/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
}
