import http from "./httpService";


export async function addCategoryApi(data : object , options = {}){
    return http.post('/admin/category/add' , data , options).then(({data})=> data.data)
}

export async function updateCategoryApi( {id,data} , options = {}){
    return http.patch(`/admin/category/update/${id}` , data , options).then(({data})=> data.data)
}

export async function removeCategoryApi({id , options = {}}){
    return http.delete(`/admin/category/remove/${id}` , options).then(({data})=>data.data)
}

export async function getAllCategoriesApi(){
    return http.get(`/category/list`).then(({data})=>data.data)
}

export async function getCategoryByIdApi(id:string){
    return http.get(`/category/${id}`).then(({data})=>data.data)
}
