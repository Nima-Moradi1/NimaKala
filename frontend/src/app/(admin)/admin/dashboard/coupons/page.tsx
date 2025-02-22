import { CreateCouponBtn } from "@/components/dashboard/coupons/couponActionBtns";
import CouponsTable from "@/components/dashboard/coupons/CouponsTable";


const CouponsPage = async () => {

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
      <h1 className='h2'>لیست کد تخفیف ها</h1>
      <CreateCouponBtn />
      </div>
      <div className="overflow-x-scroll">
      <CouponsTable/>
      </div>
    </div>
  )
}

export default CouponsPage