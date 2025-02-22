import AddToCart from "@/components/products/AddToCart";
import CategorySidebar from "@/components/products/CategorySidebar";
import GreetingModal from "@/components/products/GreetingModal";
import LikeProduct from "@/components/products/LikeProduct";
import { getAllCategoriesApi } from "@/services/categoryServices";
import { getAllProductsApi } from "@/services/productServices"
import { toPersianNumbersWithComma } from "@/utils/NumberFormatter";
import setCookieOnReq from "@/utils/SetCookieOnReq";
import truncateText from "@/utils/TruncateText";
import { cookies } from "next/headers";
import Link from "next/link";
import queryString from 'query-string'


const ProductsPageUser = async ({searchParams}) => {
  
  const cookieStore = await cookies()
  const options = setCookieOnReq(cookieStore)
  const params = await searchParams
  const urlParams = queryString.stringify(params)
  const {products} = await getAllProductsApi(urlParams , options)
  const {categories} = await getAllCategoriesApi()
  return (
    <>
    <GreetingModal />
    <div>
      <div className="md:grid md:grid-cols-4 flex flex-col m-3">
       <div className="col-span-1">
       <CategorySidebar categories={categories}/>
       </div>
       <div className="col-span-3 grid lg:grid-cols-3 grid-rows-4 md:grid-cols-2 grid-cols-1 gap-4">
        {products.map((product)=> {
          return (
            <div
            className="border rounded-xl shadow-md p-4 "
            key={product._id}
          >
            <Link href={`/products/${product.slug}`} className="hover:underline">
            <h2 className="font-bold mb-4">{truncateText(product.title , 25)}</h2>
            </Link>
            <div className="mb-4 text-sm">
              <span> قیمت: </span>
              <span className="font-bold">
                {toPersianNumbersWithComma(product.offPrice)} ت
               {product.discount > 1 ? <>
                <span className="p-1 border mr-2 rounded-full bg-error text-white"
                >{toPersianNumbersWithComma(product.discount)}%</span>
               </> : null} 
              </span>
            </div>
            <div className="flex items-start justify-between mb-5">
            <Link
              className=" text-primary-800 font-bold block"
              href={`/products/${product.slug}`}
            >
              مشاهده محصول
            </Link>
            <LikeProduct product={product} />
            </div>
            
            
            <AddToCart product={product} />
          </div>
          )
        })}
       </div>
      </div>
    </div>
    </>
  )
}

export default ProductsPageUser