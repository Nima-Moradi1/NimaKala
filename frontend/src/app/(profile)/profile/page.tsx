'use client'
import LatestPaidProduct from "@/components/profile/LatestPaidProduct"
import CardWrapper from "@/components/ui/CardWrapper"
import Fallback from "@/components/ui/Fallback"
import useGetUser from "@/hooks/react-query-hooks/user/useAuth"

const ProfilePage = () => {
      const {data,isLoading} = useGetUser()
      const {user} = data || {}
      const numberOfLikes = user?.likedProducts?.length || 0
      const numberOfItemsInCart = user?.cart?.products?.length || 0
      const numberOfPayments = user?.Products?.length || 0
      const {payments} = data || {}
      const latestPayment = payments?.at(-1)
      
      if(isLoading) return <Fallback />
  return (
    <div>
     <h1 className="h2 mb-5">
      آخرین وضعیت شما
     </h1>
     <CardWrapper numberOfItemsInCart={numberOfItemsInCart}
     numberOfLikes={numberOfLikes} numberOfPayments={numberOfPayments}/>
     <h1 className="h2 mb-5">آخرین سفارش شما</h1>
     <div className="overflow-x-scroll border p-4 rounded-xl shadow-inner">
     <LatestPaidProduct lastPayment={latestPayment} />
     </div>
    
    </div>
  )
}

export default ProfilePage