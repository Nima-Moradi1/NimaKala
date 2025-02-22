import { getAllCategoriesApi } from "@/services/categoryServices";
import { useQuery } from "@tanstack/react-query";

interface CategoriesProps {
    title : string ,
    _id : string ,
    englishTitle? : string ,
    slug? : string,
    description? : string ,
    
}

export function useFetchCategories() {
   const {data , isLoading} = useQuery({
        queryKey:['categories'],
        queryFn:getAllCategoriesApi
    })
    const { categories: rawCategories = [] } = data || { categories: [] };

    const categories = rawCategories.map((item: CategoriesProps)=> (
        {
            label : item.title,
            value : item._id
        }
    ))
    return {categories , isLoading} 
}
