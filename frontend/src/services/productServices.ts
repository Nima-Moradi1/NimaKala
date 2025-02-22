import http from "./httpService";


export async function addProductApi(data , options = {}){
    return http.post('/admin/product/add' , data , options).then(({data})=> data.data)
}

export async function updateProductApi({id , data}, options = {}){
    return http.patch(`/admin/product/update/${id}` , data , options).then(({data})=> data.data)
}

export async function removeProductApi(id:string , options = {}){
    return http.delete(`/admin/product/remove/${id}` , options).then(({data})=>data.data)
}

export async function changeDiscountApi(id:string , options = {}){
    return http.post(`/admin/product/change-discount-status/${id}` , options).then(({data})=>data.data)
}

export async function getAllProductsApi(query?:string , options = {}){
    return http.get(`/product/list?${query}` , options).then(({data})=>data.data)
}

export async function getOneProductApi(id:string){
    return http.get(`/product/${id}`).then(({data})=>data.data)
}
export async function getProductBySlugApi(slug:string){
    return http.get(`/product/slug/${slug}`).then(({data})=>data.data)
}

export async function likeProductApi(id:string){
    return http.post(`/product/like/${id}`).then(({data})=>data.data)
}
