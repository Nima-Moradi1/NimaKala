
import LikedProductsTable from '@/components/profile/LikedProductsTable';
import BreadCrumbs from '@/components/ui/BreadCrumbs';
import Fallback from '@/components/ui/Fallback';
import { getUserApi } from '@/services/authServices';
import { getOneProductApi } from '@/services/productServices';
import setCookieOnReq from '@/utils/SetCookieOnReq';
import { cookies } from 'next/headers';
import { Suspense } from 'react';


const UserLikedProducts = async () => {
  const cookieStore = await cookies()
  const options = setCookieOnReq(cookieStore)
  const {user} = await getUserApi(options)
      // i'm trying to fetch all liked products in parallel since i only have ids in user log
      const productPromises = user?.likedProducts?.map(async (productId) =>
        await getOneProductApi(productId)
      );
      const productData = await Promise.all(productPromises);
  return (
    <div>
        <BreadCrumbs  breadCrumbs={[
            {
                label : 'پروفایل' ,
                href : '/profile'
            },
            {
                label : 'محصولات پسندیده شده' ,
                href : '/profile/likedProducts',
                active : true
            }
        ]}/>
        <Suspense fallback={<Fallback/>}>
          <LikedProductsTable products={productData}/>
        </Suspense>
    </div>
  )
}

export default UserLikedProducts