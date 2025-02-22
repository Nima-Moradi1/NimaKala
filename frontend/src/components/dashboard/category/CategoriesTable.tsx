import React from 'react'
import Table from '@/components/ui/Table';
import { getAllCategoriesApi } from '@/services/categoryServices'
import toLocalDateShort from '@/utils/DateFormatter';
import { toPersianDigits } from '@/utils/NumberFormatter';
import truncateText from '@/utils/TruncateText';
import { DeleteCategory, UpdateCategory } from './actionButtons';

const CategoriesTable = async () => {
     const {categories} = await getAllCategoriesApi()

  if(!categories) return <p>دسته بندی یافت نشد</p>
  return (
    <Table className='table'>
    <Table.Header>
        <th>#</th>
        <th>عنوان فارسی</th>
        <th>عنوان انگلیسی</th>
        <th>توضیحات</th>
        <th>نوع</th>
        <th>تاریخ ایجاد</th>
        <th>عملیات</th>
    </Table.Header>
    <Table.Body>
        {categories.map((category, index:number)=> (
            <Table.Row key={category._id}>
                <td>{toPersianDigits(index + 1)}</td>
                <td>{truncateText(category.title , 25)}</td>
                <td>{truncateText(category.englishTitle , 25)}</td>
                <td>{truncateText(category.description , 25)}</td>
                <td>{category.type}</td>
                <td>{toLocalDateShort(category.createdAt)}</td>
                <td>
                    <div className="flex items-center justify-center gap-x-3">
                {/* obviously we need to know what we're deleting or updating, therefore we send id as props */}
                        <UpdateCategory id={category._id} />
                        <DeleteCategory category={category} />
                    </div>
                </td>
            </Table.Row>
        ))}
    </Table.Body>
</Table>
   
)
}

export default CategoriesTable