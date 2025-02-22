import http from "./httpService";

export async function AddToCartApi(productId:object){
    return http.post(`/cart/add` , productId).then(({data})=>data.data)
}

export async function decrementFromCartApi(productId : object){
    return http.post('/cart/remove', productId).then(({data})=>data.data)
}

export async function addCouponToCartApi(data : object){
    return http.post('/cart/coupon', data).then(({data})=>data.data)
}

export async function removeCouponFromCartApi(data : object){
    return http.delete('/cart/remove', data).then(({data})=>data.data)
}