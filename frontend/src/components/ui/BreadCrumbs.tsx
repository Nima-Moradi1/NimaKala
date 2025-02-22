import Link from "next/link";

interface BreadCrumbsProps {
        href : string , 
        active? : boolean , 
        label : string, 
        length? : number
        index? : number
}

//? This component is to let the user know where they are in the app and how they got there

export default function BreadCrumbs({breadCrumbs}:{breadCrumbs : BreadCrumbsProps[]}) {
    return (
        <nav className="mb-8 block" aria-label="Breadcrumb">
            <ol className="flex gap-x-3 text-lg items-center">
                {breadCrumbs.map((breadCrumb,index)=> (
                    <li key={breadCrumb.href}
                    aria-current={breadCrumb.active}
                    className={` flex gap-x-3  ${breadCrumb.active ? 'text-primary-800 underline' : "text-secondary-550" } ` } >
                      <Link className="hover:underline"
                       href={breadCrumb.href}>
                      {breadCrumb.label}
                      </Link>
                      {/*//? we want to keep entering slashes between routes until it's the end of the route */}
                     <div>
                     {index < breadCrumbs.length - 1 ? (
                        <span className="inline-block">/</span>
                      ): null}</div> 
                    </li>
                ))}
            </ol>
        </nav>
    )
}