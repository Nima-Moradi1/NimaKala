import AddToCart from '@/components/products/AddToCart'
import MoveBackBtn from '@/components/ui/MoveBackBtn'
import { getAllProductsApi, getProductBySlugApi } from '@/services/productServices'
import { toPersianNumbersWithComma } from '@/utils/NumberFormatter'


export const generateStaticParams = async () => {
   const {products} = await getAllProductsApi()
   return products.map((product)=> ({
    slug : product.slug
   }))
}
// i make it an SSG page or {cache : "force-cache"}
export const dynamic = "force-static"; 
export const dynamicParams = false;

const SingleProductPage = async ({params}) => {

    const {slug} = await params
    const {product} = await getProductBySlugApi(slug)

  return (
    <> 
     <MoveBackBtn className='hover:translate-x-3 *:hover:stroke-primary-800 transition-all 
     duration-300 mb-10 mr-10 lg:w-1/3 flex items-center justify-center'/>
    <div className='p-4 flex flex-col items-center justify-center'>
        <div className='border p-3 rounded-xl shadow-inner xl:w-2/5 md:w-1/2 sm:w-2/3 w-full '>
        <h1 className="font-bold text-2xl mb-6">{product.title}</h1>
    <p className="mb-6">{product.description}</p>
    <p className="mb-6">
      قیمت محصول :{" "}
      <span className={`${product.discount ? "line-through" : "font-bold"}`}>
        {toPersianNumbersWithComma(product.price)} ت
      </span>
    </p>
    {!!product.discount && (
      <div className="flex items-center gap-x-2 mb-6">
        <p className="text-xl font-bold">
          قیمت با تخفیف : {toPersianNumbersWithComma(product.offPrice)} ت
        </p>
        <div className="bg-rose-500 px-2 py-0.5 rounded-xl text-white text-sm">
          {toPersianNumbersWithComma(product.discount)} %
        </div>
      </div>
    )}
    <AddToCart product={product} />
        </div>
  </div></>
   
  )
}

export default SingleProductPage