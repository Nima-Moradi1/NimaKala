import SpinnerMini from "./SpinnerMini";

export default function Fallback() {
    return (
        <div className="flex items-center gap-x-4 justify-center my-12 mx-auto">
            <span className="text-secondary-500 animate-pulse">
                در حال بارگذاری اطلاعات
            </span>
            <SpinnerMini />
        </div>
    )
}