import API from "../_api";

export const getReturns = async () =>{
  const {data} =await API.get("/returns", {
    headers:{
        "Authorization": `Bearer ${localStorage.getItem('accessToken')}`
      }
  })
  return data.data
}

export const createReturns = async (data) => {
  try {
    console.log("Data yang dikirim ke /returns:", data);
    const response = await API.post("/returns",data,{
      headers:{
        "Authorization": `Bearer ${localStorage.getItem('accessToken')}`
      }
    })
    return response.data
  } catch (error) {
    if (error.response) {
      console.error("Validasi Gagal:", error.response.data);
    } else {
      console.error("Error:", error.message);
    }
    throw error
  }
}