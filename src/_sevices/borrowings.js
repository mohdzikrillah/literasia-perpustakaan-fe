import API from "../_api";

export const getBorrowings = async () =>{
  const {data} =await API.get("/borrowings", {
    headers:{
        "Authorization": `Bearer ${localStorage.getItem('accessToken')}`
      }
  })
  return data.data
}

export const createBorrowings = async (data) => {
  try {
    const response = await API.post("/borrowings",data,{
      headers:{
        "Authorization": `Bearer ${localStorage.getItem('accessToken')}`
      }
    })
    return response.data
  } catch (error) {
    console.log(error);
    throw error
  }
}

export const showBorrowings = async (id) => {
  try {
    const response = await API.get(`/borrowings/${id}`)
    return response.data 
  } catch (error) {
    console.log(error);
    throw error
  }
}

export const deleteBorrowings = async (id)=>{
  try {
    await API.delete(`/borrowings/${id}`)
  } catch (error) {
    console.log(error);
    throw error
  }
}