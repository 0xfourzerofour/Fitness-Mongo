import axios from 'axios'
const baseUrl = 'http://localhost:5000/users'

let token = null

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const clearToken = () => {
  token = null
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then((response) => response.data)
}

const create = async (newUser) => {
  const response = await axios.post(`${baseUrl}/add`, newUser)
  return response.data
}

const deleteUser = (id) => {
  const config = {
    headers: { Authorization: token },
  }
  const request = axios.delete(`${baseUrl}/${id}`, config)
  return request.then((response) => response.data)
}

export default {
  getAll,
  create,
  setToken,
  clearToken,
  deleteUser,
}