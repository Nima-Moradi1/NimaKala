import http from "./httpService";
import { pathRevalidator } from "@/utils/RevalidatePath";

export async function sendOTPApi(data : object){
    return http.post('/user/get-otp' , data).then(({data})=> data.data)
}

export async function checkOTPApi(data : object) {
    return http.post('/user/check-otp' , data).then(({data})=> data.data)
}

export async function completeProfileApi(data : object) {
    return http.post('/user/complete-profile' , data).then(({data})=> data.data)
}

export async function getUserApi(options  = {}) {
    return http.get('/user/profile' , options).then(({data})=> data.data)
}

export async function updateUserProfileApi(data : object) {
    return http.patch('/user/update' , data).then(({data})=> data.data)
}

export async function logoutApi() {
    return http.post('/user/logout').then(()=> pathRevalidator('/' , 'layout'))
}

export async function getAllUsersApi(options = {}) {
    return http.get('/admin/user/list' , options).then(({data})=>data.data)
}