import React from 'react'
import "./listusers.css"
import { useEffect, useRef, useState } from 'react';
import userApi from './api/userApi';




const ListUsers = () => {

  const [listUsers,setListUser] = useState([]) 
  const [page,setPage]  = useState(1)
  const [order,setOrder] = useState("ASC")
  const [result,setResult] = useState({page: page, results: 10,})
  const [searchValue,setSearchValue] = useState('')


  //Fetch Api
  useEffect(()=>{
    const  fetchUserList = async () =>{
      try {
         const setResult = {
          page: page,
          results: 100
        }
        const response = await  userApi.getAll(result);
        

        setListUser(response.results)
      } catch (error) {
        console.log("loi",error)
      }
    }
    fetchUserList()
  },[page ])

  //render users and search by username
  const renderUsers =   (listUsers.filter((val) =>{
        if(searchValue.trim() ==="" ){ 
            return val
        }
        else if(val.login.username.toLowerCase().includes(searchValue.trim().toLowerCase())) {
            return val
        }}))
        .map( (user,index) =>{
            return(
            <tr className='tr'   key={index} >
                <td  > {Object.values(user.name).join(' ')}  </td>
                <td  > {user.login.username}  </td>
                <td   > <img src={user.picture.thumbnail} alt="" />  </td>
            </tr>
        )
    })
  
  
  //next page
  const handleNextPage = () =>{
    setPage(page+1)
    setResult({
        page: page,
        results: 100
        })
    handleBackOnTop()
  }


  //prev page
  const handlePrevPage = () =>{
     page -1 ===0 ? setPage(page)  :setPage(page-1)
    if(page - 1 ===1) {
        setResult({
        page: page,
        results: 10
        })
    }
    handleBackOnTop()
  }

  //Come back on top
  const handleBackOnTop = () =>{
        document.body.scrollTop= 0;
        document.documentElement.scrollTop= 0;
  }
 

  //Sort by first name
  const handleSortFirstName =(e) =>{
        if(order=== "ASC"){
            const sorted = [...listUsers].sort((a,b)=>
            a.name.first.toLowerCase() > b.name.first.toLowerCase() ? 1 : -1
        );
            setListUser(sorted);
            setOrder("DSC");
        }
        else  if(order=== "DSC"){
            const sorted = [...listUsers].sort((a,b)=>
             a.name.first.toLowerCase() < b.name.first.toLowerCase() ? 1 : -1
        );
            setListUser(sorted);
            setOrder("ASC");
        }
    } 
      

    // sort by username
    const handleSortUsername =(e) =>{
        if(order=== "ASC"){
            const sorted = [...listUsers].sort((a,b)=>
            a.login.username.toLowerCase() > b.login.username.toLowerCase() ? 1 : -1
        );
            setListUser(sorted);
            setOrder("DSC");
        }
        else  if(order=== "DSC"){
            const sorted = [...listUsers].sort((a,b)=>
             a.login.username.toLowerCase() < b.login.username.toLowerCase() ? 1 : -1
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
       
      </div>
       <table className='list' >
            <thead>
              <tr >
                    <th onClick={() => handleSortFirstName()}>Full name</th>
                    <th onClick={() => handleSortUsername()} >UserName</th>
                    <th>Thumbnail</th>
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
          <button onClick={handleBackOnTop} >Back On Top</button>
        </div>

      
    </div>
  )
}

export default ListUsers