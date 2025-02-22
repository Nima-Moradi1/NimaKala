'use client'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

const Search = () => {
//? For pushing the user in the search result
const router = useRouter()
//? We need the pathname to push the user
const pathname = usePathname()
//? This hook gives us a readOnly value of the searchParams we give it
  const searchParams = useSearchParams()
const formSubmit = (e) => {
  e.preventDefault();
  const search = e.target.search
  const searchValue = search.value

  //url logics ?>>>
  const newParams = new URLSearchParams(searchParams.toString()); //output >> e.g: search=salam
  //? In the first time the user search, the page should be 1 and we should set that manually on the url
  newParams.set('page', '1')
  if(searchValue) {
    newParams.set('search' , searchValue)
  }else {
  //? If nothing was sent (written in search input) delete the search params in the url
    newParams.delete('search')
  }
  //? Add the search results as a query with the url user's in.
  router.push(`${pathname}?${newParams.toString()}`, {scroll : false})
}

  return (
    <form className='relative' onSubmit={formSubmit}>
        <input 
        key={searchParams?.get("search")}
        type='text'
        name='search'
        placeholder='جستجو..   '
        autoComplete='off'
        defaultValue={searchParams?.get("search") || ""}
        className='textField__input py-3 text-xs bg-secondary-0'
        />
        <button 
        type='submit'
        className='absolute left-0 top-0 ml-3 flex h-full items-center'>
            <MagnifyingGlassIcon className='h-4 text-secondary-400' />
        </button>
    </form>
  )
}

export default Search