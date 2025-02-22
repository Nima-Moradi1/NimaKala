import { toPersianDigits, toPersianNumbersWithComma } from "@/utils/NumberFormatter";
import Table from "../ui/Table";
import toLocalDateShort from "@/utils/DateFormatter";
import ErrorMsg from "../ui/ErrorMsg";

const LatestPaidProduct = ({lastPayment}) => {
const latestPaidProducts = lastPayment?.cart?.productDetail?.map((product)=>{
    return product
}) || null;

if(!lastPayment) return <ErrorMsg msg={'شما هیچ ثبت سفارشی در سایت نداشته اید'}/>
return (
    <div>
        <h2>اطلاعات پرداخت</h2>
        <Table className="table w-full mx-auto max-w-screen-md">
            <Table.Header>
                <th>مبلغ پرداخت</th>
                <th>کد رهگیری</th>
                <th>تاریخ</th>
                <th>وضعیت</th>
            </Table.Header>
            <Table.Body>
                <Table.Row>
                    <td>{toPersianNumbersWithComma(lastPayment?.amount)} تومان</td>
                    <td>{toPersianDigits(lastPayment?.invoiceNumber)}</td>
                    <td>{toLocalDateShort(lastPayment?.createdAt)}</td>
                    <td><div>
                        <span className={`w-12 rounded-full p-2 text-white ${lastPayment?.status === "COMPLETED" ? "bg-green-600" : "bg-error"}`}>
                {lastPayment?.status === "COMPLETED" ? "موفق" : "ناموفق"}
                        </span>
                    </div>
                        </td>
                </Table.Row>
            </Table.Body>
        </Table>
        <div className="mt-3">
            {/* product section */}
            <h1>محصولات سفارش</h1>
            <Table className="table w-full mx-auto max-w-screen-md">
            <Table.Header>
                <th>#</th>
                <th>عنوان</th>
                <th>قیمت اصلی</th>
                <th>تخفیف</th>
                <th>قیمت با تخفیف</th>
            </Table.Header>
            <Table.Body>
                {latestPaidProducts?.map((product, index:number)=> {
                    return (
                        <Table.Row key={product?._id}>
                        <td>{toPersianDigits(index + 1)}</td>
                        <td>{product?.title}</td>
                        <td>{toPersianNumbersWithComma(product?.price)} تومان</td>
                        <td>
                            <div className="border w-10 mx-auto p-1.5 text-green-700 text-center rounded-full border-green-500 flex items-center justify-center"
                            > <span>
                            {toPersianDigits(product?.discount)} ٪
                            </span></div>
                           
                        </td>
                        <td>{toPersianNumbersWithComma(product?.offPrice)} تومان</td>
                    </Table.Row>
                    )
                })}
               
            </Table.Body>
        </Table>
        </div>
    </div>
  )
}

export default LatestPaidProduct