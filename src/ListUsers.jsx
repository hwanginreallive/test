import React from 'react'
import "./listusers.css"
import { useEffect, useRef, useState } from 'react';
import userApi from './api/userApi';
import {AiOutlineSearch ,AiOutlineSortDescending, AiOutlineSortAscending} from "react-icons/ai"

  const title = [
    {
      name: 'Full name',
    },
    {
      name: 'Username',
    },
    {
      name: 'Thumnail',
    },
  ]

  
const ListUsers = () => {
     
  const [listUsers,setListUser] = useState([]) 
  const [saveListUsers,setSaveListUsers] = useState([]) 
  const [page,setPage]  = useState(1)

  const [order,setOrder] = useState("ASC")

  const [result,setResult] = useState({
    page: page,
    results: 10,
  })


  const [searchValue,setSearchValue] = useState('')


  useEffect(()=>{
    const  fetchUserList = async () =>{
      try {
         const setResult = {
          page: page,
          results: 100
        }
        const response = await  userApi.getAll(result);
        
        const saveListUsers = setSaveListUsers(response.results)

        setListUser(response.results)
      } catch (error) {
        console.log("loi",error)
      }
    }
    fetchUserList()
  },[page])


  const renderUsers =   (listUsers.filter((val) =>{
        if(searchValue.trim() ==="" ){ 
            return val
        }
        else if(val.login.username.toLowerCase().includes(searchValue.trim().toLowerCase())) {
            return val
        }
  } )).map( (user,index) =>{
        return(
        <tr key={index} >
            <td  > {Object.values(user.name).join(' ')}  </td>
            <td  > {user.login.username}  </td>
            <td   > <img src={user.picture.thumbnail} alt="" />  </td>
        </tr>
        )
    })

  const handleNextPage = () =>{
    setPage(page+1)
    setResult({
        page: page,
        results: 100
    })
    handleBackToTop()
  }

  const handlePrevPage = () =>{
     page -1 ===0 ? setPage(page)  :setPage(page-1)
    if(page - 1 ===1) {
        setResult({
        page: page,
        results: 10
    })
        
    }
        handleBackToTop()
  }

  const handleBackToTop = () =>{
        document.body.scrollTop= 0;
        document.documentElement.scrollTop= 0;
  }
 

  const handleSort =(props) =>{

        if(order=== "ASC"){

            const sorted = [...listUsers].sort((a,b)=>
            a[props].toLowerCase() > b[props].toLowerCase() ? 1 : -1
        );
            setListUser(sorted);
            setOrder("DSC");
        }
        if(order=== "DSC"){
            const sorted = [...listUsers.results.name.first].sort((a,b)=>
            a[saveListUsers.values.props].toLowerCase() < b[props].toLowerCase() ? 1 : -1
        );
            setListUser(sorted);
            setOrder("ASC");
        }
        

    } 
      


  return (
      <div className="list-users">
      <div className="search">
        <p>Tìm kiếm</p>
        <div>
            <input type="text"  
                onChange={(e) =>setSearchValue(e.target.value)}
            />
        </div>
    
        <button onClick={() => handleSort("first")}  >
            <AiOutlineSortAscending></AiOutlineSortAscending>
        </button   >
        <button onClick={() => handleSort("username")}  >
            <AiOutlineSortDescending></AiOutlineSortDescending>
        </button>

      </div>
       <table className='list' >
            <thead>
              <tr >
                    <th>Full name</th>
                    <th>Username</th>
                    <th>Thumnail</th>
              </tr>
            </thead>
            <tbody>
                {renderUsers}
            </tbody>
       </table>
        <div className="button">
          <button onClick={handlePrevPage} >Prev</button>
          <i className='page' >{page}</i>
          <button onClick={handleNextPage} >Next</button>
          <button onClick={handleBackToTop} >Back To Top</button>
        </div>

      
    </div>
  )
}

export default ListUsers