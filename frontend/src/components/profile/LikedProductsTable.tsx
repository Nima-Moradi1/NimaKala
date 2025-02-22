//? It's better to use this as a client component, because it's a private route and the SEO is not important.


import Table from '@/components/ui/Table';
import { toPersianDigits } from '@/utils/NumberFormatter';
import truncateText from '@/utils/TruncateText';
import Link from 'next/link';
import ErrorMsg from '../ui/ErrorMsg';

const LikedProductsTable = ({products}) => {

    if(products.length <= 0) return <ErrorMsg msg={'شما هیچ محصولی را هنوز لایک نکرده اید'}/>
  return (
    <div>
      <h2 className='h2 mb-5'>محصولاتی که لایک کردید</h2>
      <div className='overflow-x-scroll'>
      <Table className='table'>
         <Table.Header>
             <th>#</th>
             <th>عنوان</th>
             <th>توضیحات</th>
             <th>دسته بندی</th>
             <th>برند</th>
             <th>قیمت اولیه</th>
             <th>تخفیف</th>
             <th>قیمت با تخفیف</th>
         </Table.Header>
         <Table.Body>
             {products.map((product, index:number)=> (
                 <Table.Row key={product?.product._id}>
                     <td>{toPersianDigits(index + 1)}</td>
                     <td><Link className='hover:underline'
                      href={`/profile/likedProducts/${product?.product.slug}`}>
                     {truncateText(product?.product.title , 20)}
                     </Link></td>
                     <td>{truncateText(product?.product.description , 20)}</td>
                     <td>{truncateText(product?.product.category.title , 20)}</td>
                     <td>{product?.product.brand}</td>
                     <td>{toPersianDigits(product?.product.price)}ت</td>
                     <td>{toPersianDigits(product?.product.discount)}%</td>
                     <td>{toPersianDigits(product?.product.offPrice)}ت</td>
                 </Table.Row>
             ))}
         </Table.Body>
     </Table>
      </div>
    </div>
  )
}

export default LikedProductsTable