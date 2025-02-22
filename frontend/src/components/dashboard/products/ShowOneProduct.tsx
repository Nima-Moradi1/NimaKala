import { toPersianNumbersWithComma } from '@/utils/NumberFormatter'


interface ProductProps {
  title : string,
  description:string,
  discount:number,
  price:number,
  offPrice:number
}

const ShowOneProduct = ({product , children}:{children?:React.ReactNode , product:ProductProps}) => {
  return (
       <div className=''>
            <div className='border p-4 rounded-lg xl:w-1/3 md:w-1/2 sm:w-2/3 w-full '>
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
        <div>{children}</div>
            </div>
      </div>
  )
}

export default ShowOneProduct