export const Tokenupdate = async()=>{
    var refresh_token = window.localStorage.getItem('refresh_token')
    
    try {
      let data = await axios({
        method: 'post',
        url: 'http://127.0.0.1:8000/api/token/refresh/',
        data:{"refresh" : refresh_token },
    })
    console.log("data",data.data)
  
    window.localStorage.setItem('access_token', data.access)    
 

  } catch (error) {
    console.log("error",error)
  }
   

  }