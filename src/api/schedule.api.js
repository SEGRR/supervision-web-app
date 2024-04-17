import axios from "axios";


const url = import.meta.env.VITE_APP_API_URL;


export async function fetchAllSchedules() {
  try {
    const response = await axios.get(`${url}/supervision`);
    return response.data;
  } catch (error) {
    console.log("Error:", error);
    return null;
  }
}


export async function sendBasicInfo(data) {
    try {
      console.log(data);
      const response = await axios.post(`${url}/supervision/new`,data);
      return response.data;
    } catch (error) {
      console.error("Error:", error);
    }
  }
  
  export async function saveSchedule(data){
    try {
      console.log(data);
      const response = await axios.post(`${url}/supervision/save`,data);
      return response.data;
    } catch (error) {
      console.error("Error:", error);
    }
  }
  
  export async function getScheduleById(id){
    try {
      console.log(id);
      const response = await axios.get(`${url}/supervision/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error:", error);
    }
  }

  
export async function removeScheduleById(id) {
  try {
    const response = await axios.delete(`${url}/supervision/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
}


export async function fetchAllSubjects() {
  try {
    const response = await axios.get(`${url}/subjects`);
    return response.data;
  } catch (error) {
    console.log("Error:", error);
    return null;
  }
}