/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';

export const app = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  //withcredentials >> true > set cookies (access & refresh) automatically in headers all of the fetch requests in authService.ts
  //therefore, there is no need to pass it ever again !
  withCredentials : true ,
});
//since we're checking if we have refresh token or access token (or neither or both!)
//we use the axios gate called INTERCEPTORS to send a request and get a response
app.interceptors.request.use(
  (res:any)=> res ,
  (err:any)=> Promise.reject(err)
)
app.interceptors.response.use(
  (res:any)=>res ,
  async (err:any) => {
    //401 >> unauthorized access we got from logging the error >> it means we have refresh-token but not an access-token
    //destructured from error logging in console (server gives us this config)
    const originalConfig = err.config
    if(err.response.status === 401 && !originalConfig._retry) {
    //we only want this to run ONCE! so, only run this when originalCongig._retry is falsy value (or doesn't exist)
        originalConfig._retry = true
        try {
    // I tried fetching with app.get() but when there's no refresh-token, it constantly fetches to get one! >> but with axios we only fetch it once
    const {data} = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/user/refresh-token`,
        {
          withCredentials : true
        }
       )
       if(data) return app(originalConfig)
      }catch(error) {
    return Promise.reject(error)
  }
    }
    //if it didn't enter the upper block (401 code), we do this:
    return Promise.reject(err)
  }
)

const http = {
    get : app.get,
    patch : app.patch,
    put : app.put,
    post : app.post,
    delete : app.delete
}
export default http ;