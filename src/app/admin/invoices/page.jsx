"use client"
import { useEffect, useState } from "react"
//import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form";

const InvoicesPage = () => {

  const { 
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [invoices, setInvoices] = useState([]);
  const [totalPages, setTotalPages] = useState(0);

  

  const checked = (value) => {
    setPage(value);
  }

  const getPagination = (value) => {
    let pages = [];
    
    for (let i = 1; i <= value; i++) {
      pages.push(<button key={i} onClick={()=> checked(i)} className={`join-item btn ${page==(i) ? "btn-active" : ""}`}>{i}</button>);
    }
    
    return pages;
  };

  const getInvoices = async() => {

    try {
      const res = await fetch(`http://localhost:8080/api/invoices?limit=5&page=${page}&status=${status}`,{
        credentials: 'include'
      });

      console.log(res);
      const data = await res.json();
      console.log(data.invoices);

      setInvoices(data.invoices.docs);
      setTotalPages(data.invoices.totalPages);
      setIsLoading(false);
      
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
    
  }

  const changeStatus = async(id, status) =>{

    try {

      const res = await fetch(`http://localhost:8080/api/invoices/status/${id}/${status}`,{
      method: 'POST',
      credentials: 'include'
    });
    
    console.log(res);
    const data = await res.json();
    console.log(data);
    
    getInvoices();
    console.log("Update successfully");
      
    } catch (error) {
      console.log("Error update");
      console.log(error);
    }

  }

  const onSubmit = async(data)=>{
    
    try {

      const res = await fetch(`http://localhost:8080/api/invoices?limit=5&page=1&status=${data.status}`,{
      credentials: 'include'
    });
    
    console.log(res);
    const resJSON = await res.json();
    console.log(resJSON);
    setInvoices(resJSON.invoices.docs);
    console.log("Search successfully");
      
    } catch (error) {
      console.log("Error search");
      console.log(error);
    }

  }

  useEffect(() => {
    getInvoices();
    setIsLoading(true);
    console.log(invoices);
  }, [page]);

  return (
    <section className='min-h-[calc(100vh-56px)] pt-[80px] px-[20px]'>

      <div className="bg-white shadow-md rounded-badge mt-[20px] p-[10px] sm:p-[20px]">
        
        <h3 className="text-gray-700 text-xl text-center font-bold mb-[10px]">Invoices</h3>

        <form
        onSubmit={handleSubmit(onSubmit)}
        className="py-[10px] flex items-center"
        >
            
          <div className="mb-4 flex flex-col">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Status
            </label>
                
            <select
            className={`${ errors.status ? 'border-red-500' : '' } shadow border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
            {...register("status")}
            >
              <option value="">All</option>
              <option value="1">Accepted</option>
              <option value="2">Pending</option>
              <option value="3">Rejected</option>
            </select>
          </div>

          <div className="mt-[12px] ml-[20px] flex items-center justify-between">
            <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
            >
              Search
            </button>
          </div>

          </form>

        <div className="overflow-x-auto h-[330px]">
          <table className="table table-xs sm:table-md text-center">
            <thead>
              <tr>
                <th>ID</th> 
                <th>User</th>
                <th>Room</th>
                <th>Date init</th>
                <th>Date end</th>
                <th>Amount</th>
                <th>Reference</th>
                <th>Created</th>
                <th>Status</th>
                <th>Options</th>
              </tr>
            </thead> 
            <tbody>

              {
                invoices.map(invoice=>(
                  <tr key={invoice._id} className="hover">
                    <th className="">{invoice._id}</th> 
                    <td>{invoice.user.email}</td>
                    <td>{invoice.room.name}</td>
                    <td>{new Date(invoice.dateInit).toLocaleDateString()}</td>
                    <td>{new Date(invoice.dateEnd).toLocaleDateString()}</td>
                    <td>{invoice.totalPrice}</td>
                    <td>{invoice.reference}</td>
                    <td>{new Date(invoice.createdAt).toLocaleDateString()}</td>
                    <td>
                      {
                        invoice.status===1 && '🟢' ||
                        invoice.status===2 && '🔴' || '🟠'
                      }
                    </td>
                    <td>
                      <button onClick={()=> changeStatus(invoice._id, 1)} className="btn btn-sm btn-info"> A </button>
                      <button onClick={()=> changeStatus(invoice._id, 2)} className="btn btn-sm btn-error"> R </button>
                      <button onClick={()=> changeStatus(invoice._id, 3)} className="btn btn-sm btn-warning"> P </button>
                    </td>
                  </tr>
                ))
              }

            </tbody> 
                
          </table>
        </div>

        <div className="join pt-[10px]">
          {getPagination(totalPages)}
        </div>

      </div>
      
    </section>
  )
}

export default InvoicesPage