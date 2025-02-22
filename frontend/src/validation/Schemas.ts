   import * as yup from 'yup'
   
export const sendOTPSchema = yup.object({
            phoneNumber : yup.string().required('تلفن همراه الزامی است')
            .matches(/^09\d{9}$/, "شماره وارد شده معتبر نمیباشد"),
}).required()

export const checkOTPSchema = yup.object({
    phoneNumber : yup.string().required() , 
    otp : yup.string().required()
}).required()

export const CompleteProfileSchema = yup.object({
    name:yup.string().required('نام الزامی است'),
    email:yup.string().email('ایمیل معتبر وارد کنید').required('ایمیل الزامی است')
}).required()

export const UpdateProfileSchema = yup.object({
    name:yup.string().required('نام الزامی است'),
    email:yup.string().email('ایمیل معتبر وارد کنید').required('ایمیل الزامی است'),
    phoneNumber : yup.string().required('تلفن همراه الزامی است')
    .matches(/^09\d{9}$/, "شماره وارد شده معتبر نمیباشد") , 
    biography : yup.string()
    .max(35 , 'بیش از ۳۵ کاراکتر مجاز نیست')
})

export const AddCategorySchema = yup.object({
    title: yup.string().required(' عنوان فارسی ضروری است').min(3 , 'حداقل ۳ کاراکتر وارد کنید'),
    englishTitle: yup.string().required('عنوان انگلیسی ضروری است')
    .min(3 , 'حداقل ۳ کاراکتر وارد کنید').matches(/^[A-Za-z\s]+$/, 'باید فقط شامل حروف انگلیسی باشد'),
    type: yup.string().required(' نوع ضروری است'),
    description: yup.string().required('توضیحات ضروری است').min(6 , 'حداقل ۶ کاراکتر وارد کنید'),
}).required()

export const ProductSchema = yup.object({
    title: yup.string().required(' عنوان محصول ضروری است').min(3 , 'حداقل ۳ کاراکتر وارد کنید'),
    description: yup.string().required('توضیحات ضروری است').min(6 , 'حداقل ۶ کاراکتر وارد کنید'),
    slug : yup.string().required('اسلاگ الزامی است'),
    tags : yup.array(),
    imageLink : yup.mixed<File>().required('عکس الزامی است'),
    brand : yup.string().required('برند الزامی است') ,
    price : yup.number().required('قیمت الزامی است'), 
    discount : yup.number(),
    offPrice : yup.number(),
    countInStock : yup.number().required('تعداد محصول الزامی است'), 
    category : yup.string().required('دسته بندی الزامی است')
})

export const AddCouponSchema = yup.object({
    type: yup.string().default('percent'),
    code: yup.string().required('کد تخفیف الزامی است'),
    amount: yup
    .string()
    .matches(/^\d+$/, "فقط عدد مجاز میباشد").required('مقدار تخفیف الزامی است'),
      expireDate: yup.string().required('تاریخ انقضای کد الزامی است'),
      usageLimit: yup
      .string()
      .matches(/^\d+$/, "فقط عدد مجاز میباشد") 
      .required("تعداد بار قابل استفاده الزامی است"),
    productIds: yup.array().required('شناسه محصولات الزامی است'),
})