const Table = ({children , className} : {children : React.ReactNode , className? :string})=> {
    return (
        <div className={`${className} bg-secondary-0 overflow-x-auto `}>
            <table>{children}</table>
        </div>
    )
}
export default Table

const TableHeader = ({children} : {children : React.ReactNode})=> {
    return (
        <thead>
            <tr className="title-row *:text-center">
                {children}
            </tr>
        </thead>
    )
}
const TableBody = ({children} : {children : React.ReactNode})=> {
    return (
        <tbody>
            {children}
        </tbody>
    )
}

const TableRow = ({children} : {children : React.ReactNode})=> {
    return (
        <tr className="*:text-center">
            {children}
        </tr>
    )
}
//? Pretty cool feature from React that exports Only Table up there but also export these as objects of the component too!
Table.Header = TableHeader
Table.Body = TableBody
Table.Row = TableRow