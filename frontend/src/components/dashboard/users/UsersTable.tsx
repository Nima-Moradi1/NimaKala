import React from 'react'
import Table from '@/components/ui/Table';
import toLocalDateShort from '@/utils/DateFormatter';
import { toPersianDigits } from '@/utils/NumberFormatter';
import truncateText from '@/utils/TruncateText';

const UsersTable = async ({users}) => {
   
  if(!users) return <p className='m-10 text-error'> کاربری یافت نشد</p>
  return (
    <Table className='table'>
    <Table.Header>
        <th>#</th>
        <th>نام</th>
        <th>شماره همراه</th>
        <th>ایمیل</th>
        <th>سمت</th>
        <th>تاریخ ثبت نام</th>
        <th>تعداد محصولات خریداری شده</th>
    </Table.Header>
    <Table.Body>
        {users.map((user, index:number)=> (
            <Table.Row key={user._id}>
                <td>{toPersianDigits(index + 1)}</td>
                <td>{truncateText(user.name , 20)}</td>
                <td>{truncateText(user.phoneNumber , 25)}</td>
                <td>{truncateText(user.email , 25) || '-'}</td>
                <td>{user.role === "USER" ? 'مشتری' : "ادمین"}</td>
                <td>{toLocalDateShort(user.createdAt)}</td>
                <td>{user.Products?.length || 0}</td>
            </Table.Row>
        ))}
    </Table.Body>
</Table>
   
)
}

export default UsersTable