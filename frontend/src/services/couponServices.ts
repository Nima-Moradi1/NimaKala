import http from "./httpService";


export async function addCouponApi(data : object , options = {}){
    return http.post('/admin/coupon/add' , data , options).then(({data})=> data.data)
}

export async function updateCouponApi({id , data , options = {}}){
    return http.patch(`/admin/Coupon/update/${id}` , data , options).then(({data})=> data.data)
}

export async function removeCouponApi(id:string , options = {}){
    return http.delete(`/admin/Coupon/remove/${id}` , options).then(({data})=>data.data)
}

export async function getAllCouponsApi(options = {}){
    return http.get(`/admin/Coupon/list` , options).then(({data})=>data.data)
}

export async function getOneCouponApi(id:string , options = {}){
    return http.get(`/admin/Coupon/${id}` , options).then(({data})=>data.data)
}
