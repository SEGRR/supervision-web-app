//blocks

import { Subject } from "@mui/icons-material";
import axios from "axios";
const url = import.meta.env.VITE_APP_API_URL;

const blockData = [
    { name: "A1 109", capacity: "50" },
    { name: "A1 110", capacity: "49" },
    { name: "A3 307", capacity: "59" },
    { name: "A3 308", capacity: "50" },
    { name: "A3 405", capacity: "47" },
    { name: "A3 406", capacity: "48" },
    { name: "A3 407", capacity: "54" },
    { name: "IT Seminar Hall", capacity: "70" },
];

export async function fetchAllBlocks() {
    try {
        const response = await axios.get(`${url}/blocks/`);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error("Error:", error);
    }
}

export async function addBlock(data) {
    console.log(data);
    const response = await axios.post(`${url}/blocks/new`, data);
    return response.data;
}
export async function updateExistingBlock(data) {
    const response = await axios.put(`${url}/blocks/${data._id}`, data);
    return response.data;
}

export async function removeBlockById(id) {

    const response = await axios.delete(`${url}/blocks/${id}`);
    return response.data;

}


export async function fetchAllDivisions() {
    try {
        const response = await axios.get(`${url}/divisions/`);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error("Error:", error);
    }
}

export async function addDivision(data) {
    console.log(data);
    data = {...data,total:parseInt(data.endRollNo)-parseInt(data.startRollNo)+1};
    const response = await axios.post(`${url}/divisions/new`, {division:data});
    return response.data;
}
export async function updateExistingDivision(data) {
    data = {...data,total:parseInt(data.endRollNo)-parseInt(data.startRollNo)+1};
    console.log(data);

    const response = await axios.put(`${url}/divisions/${data._id}`, {division:data});
    return response.data;
}

export async function removeDivisionById(id) {

    const response = await axios.delete(`${url}/divisions/${id}`);
    return response.data;

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
export async function fetchCourseData(id) {
    try {
      const response = await axios.get(`${url}/subjects/${id}`);
      return response.data;
    } catch (error) {
      console.log("Error:", error);
      return null;
    }
  }

export async function addSubject(id,data) {
    console.log(data);
    const response = await axios.post(`${url}/subjects/${id}`, {subject:data});
    return response.data;
}

export async function addCourse(data) {
    console.log(data);
    const response = await axios.post(`${url}/subjects/new`, data);
    return response.data;
}


export async function updateExistingSubject(id,code,data) {
    const response = await axios.put(`${url}/subjects/${id}/${code}`, {subject:data});
    return response.data;
}
export async function updateExistingCourse(id,data) {
    const response = await axios.put(`${url}/subjects/${id}`, data);
    return response.data;
}

export async function removeSubjectById(id,code) {

    const response = await axios.delete(`${url}/subjects/${id}/${code}`);
    return response.data;

}
export async function removeCourseById(id) {

    const response = await axios.delete(`${url}/subjects/${id}`);
    return response.data;

}



//course