
const Pagination = ({totalPost,postPerPage,setCurrentPage})=>{
    let pages = []

    for(let i = 1; i <= Math.ceil(totalPost/postPerPage); i++){
        pages.push(i)
    }

    return(
        <>
            <div className="flex justify-between m-5 ">
                {pages.map((page,index)=>(
                    <button className="p-2 bg-white border border-slate-950 rounded font-bold me-2"  key={index} onClick={()=> setCurrentPage(page)}>{page}</button>
                ))}
            </div>
        </>
    )
}

export default Pagination