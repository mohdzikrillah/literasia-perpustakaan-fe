import API from "../_api"

export const getCategories = async() =>{
  const {data} = await API.get("/categories")
  return data.data
}

export const createCategory = async (data) => {
  try {
    const response = await API.post("/categories",data)
    return response.data
  } catch (error) {
    console.log(error);
    throw error
  }
}

export const showCategory = async (id) => {
  try {
    const response = await API.get(`/categories/${id}`)
    return response.data 
  } catch (error) {
    console.log(error);
    throw error
  }
}

export const updateCategory = async (id, data) => {
  try {
    const response = await API.post(`/categories/${id}`, data)
    return response.data
  } catch (error) {
    console.log(error);
    throw error
  }
}

export const deleteCategory = async (id)=>{
  try {
    await API.delete(`/categories/${id}`)
  } catch (error) {
    console.log(error);
    throw error
  }
}