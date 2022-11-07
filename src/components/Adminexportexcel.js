import axios from 'axios';
import React, {useEffect, useRef, useState} from 'react';
// import { useDownloadExcel } from 'react-export-table-to-excel';
import { DownloadTableExcel } from 'react-export-table-to-excel';

const Test = () =>  {
    const [orderdata,setorderdata]=useState([]);
    const [oproducts,setoproducts]=useState([]);
    var token = window.localStorage.getItem('access_token')
    // useEffect(() => {
    //     orders()
    //     orderproduct()
    // }, [])
    
    const tableRef = useRef(null);
    const orders =async()=>{
        try{
          let data = await axios.get("http://127.0.0.1:8000/product/order/",{headers:{"Authorization" : `Bearer ${token}`}})
          // console.log("data",data.data)
          setorderdata(data.data)
        }
        catch (error) {
          console.log(error)
        }
      }
      const orderproduct =async(orderid)=>{
        // console.log("ordreid",orderid)
        try{
          let data = await axios.get("http://127.0.0.1:8000/product/ordererproduct/",{headers:{"Authorization" : `Bearer ${token}`}})
        //   console.log("data",data.data)
        //   data.data.filter(t=>t.order_id.includes(14))
          
          setoproducts(data.data)
        }
        catch (error) {
          console.log(error)
        }
      } 

        return (
            <div>
                <DownloadTableExcel
                    filename="Order table"
                    sheet="Orders"
                    currentTableRef={tableRef.current}
                >
                <div className='ps-4 '>
                <button  className='btn-sm btn-info text-white'  > Export excel </button>
                </div>
                </DownloadTableExcel>
        
                {/* <button className='btn-sm btn-info' onClick={onDownload}> Export excel </button> */}
            
                 <table  ref={tableRef} hidden>
                  <tbody>
                    <tr>
                    <th scope="col">SN.No</th>
                    <th scope="col">Customer</th>
                    <th scope="col">Contact</th>
                    <th scope="col">Price</th>
                    <th scope="col">Address</th>
                    <th scope="col">city</th>
                    <th scope="col">Status</th>
                    <th scope="col">Date</th>
                    <th scope="col">Products</th>
                    </tr>
                    {orderdata.map((itm,k)=>(
                        <tr key={k}>
                           
                            <td>SN{itm.created_date.split('T')[1].split('.')[1]}{itm.id}</td>
                            <td>{itm. customer_name}</td>
                            <td>{itm.contact}</td>
                            <td>{itm.total}</td>
                            <td>{itm.delivery_address}</td>
                            <td>{itm.city}</td>
                            <td >{itm.status[0].status}</td>
                            <td>{itm.created_date.split('T')[0]}</td>
                            <td>
                                {/* {itm.id} */}
                                {oproducts.filter(t=>parseInt(t.order_id[0].id) === parseInt(itm.id)).map((productitm,k1)=>(
                                    
                                        <li key={k1}>{productitm.product[0].title} - {productitm.quantity} - {productitm.subtotal} </li>   
                                
                                ))}
                            </td>
                        </tr>
                    ))}
                   
                    
                  </tbody>
                </table>
                

            </div>
        );
    }


export default Test