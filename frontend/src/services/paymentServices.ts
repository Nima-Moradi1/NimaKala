import http from "./httpService";

export async function createPaymentApi(){
    return http.post('/payment/create').then(({data})=>data.data)
}

export async function getAllPaymentsApi(options = {}){
    return http.get('/admin/payment/list', options).then(({data})=>data.data)
}

//! the get one payment is still not tested
export async function getOnePaymentApi(id:string ,options = {}){
    return http.get(`/admin/payment/${id}` , options).then(({data})=>data.data)
}