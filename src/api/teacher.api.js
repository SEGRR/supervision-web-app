import axios from "axios";


const url = import.meta.env.VITE_APP_API_URL;


export async function fetchAllTeachers() {
  try {
    const response = await axios.get(`${url}/teachers/`);
    return response.data;
  } catch (error) {
    console.error("Error:", error);
  }
}

export async function fetchTeacherById(id) {
  try {
    const response = await axios.get(`${url}/teachers/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error:", error);
  }
}

export async function addNewTeacher(data) {
  try {
    const response = await axios.post(`${url}/teachers/new`, data);
    return response.data;
  } catch (error) {
    console.error("Error:", error);
  }
}

export async function updateExistingTeacher(data) {
  try {
    const response = await axios.put(`${url}/teachers/edit/${data._id}`, data);
    return response.data;
  } catch (error) {
    console.error("Error:", error);
  }
}

export async function removeTeacherById(id) {
  try {
    const response = await axios.delete(`${url}/teachers/delete/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error:", error);
  }
}
