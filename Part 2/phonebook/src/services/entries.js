import axios from "axios";

const baseUrl = 'http://localhost:3001/persons'

const getAllEntries = () => {
    return axios.get(baseUrl)
  }
  
  const createEntry = newObject => {
    return axios.post(baseUrl, newObject)
  }
  
  const updateEntry = (id, newObject) => {
    return axios.put(`${baseUrl}/${id}`, newObject)
  }

  const deleteEntry = id => {
      return axios.delete(`${baseUrl}/${id}`)
  }
  
  export default {getAllEntries, createEntry, updateEntry, deleteEntry}