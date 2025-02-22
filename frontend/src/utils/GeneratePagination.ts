

export default function generatePagination(currentPage : number , totalPages : number) {

    //? If there are 7 pages or less, show all pages without ellipsis
    if(totalPages <= 7) {
    //? i starts from 0, so we add 1 to it to get the actual page number
        return Array.from({length: totalPages}, (_, i) => i + 1)
    }
    //? If the current page is among the first 3 pages, show the first 3, an ellipsis, and the last 2 pages
     if(currentPage <= 3) {
        return [1,2,3,"...",totalPages - 1 , totalPages]
     }
    //? If the current page is among the last 3 pages, show the first 2 pages, an ellipsis, and the last 3 pages
     if(currentPage >= totalPages - 2) {
        return [1,2,"...",totalPages - 2 , totalPages - 1 , totalPages]
     }
    //? If the current page is among the middle pages, show the first page, an ellipsis, the current page and its neighbors, an ellipsis, and the last page
        return [1,"...",currentPage - 1,currentPage,currentPage + 1,"...",totalPages]
}