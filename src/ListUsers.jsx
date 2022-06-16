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
  const [users,setUsers]  = useState([])
  const [page,setPage]  = useState(1)

  const [sort,SetSort] = useState(false)


  const inputRef = useRef();

  const [searchValue,setSearchValue] = useState('')
  const [searchUsers,setSearchUsers] = useState([])


  useEffect(()=>{
    const  fetchUserList = async () =>{
      try {
         const params = {
          page: page,
          results: 10
        }
        const response = await  userApi.getAll(params);

        setListUser(response.results)
      } catch (error) {
        console.log("loi",error)
      }
    }
    fetchUserList()
  },[page])


  const renderUsers =  listUsers.map( (user,index) =>(
        <tr key={index} >
            <td  > {Object.values(user.name).join(' ')}  </td>
            <td  > {user.login.username}  </td>
            <td   > <img src={user.picture.thumbnail} alt="" />  </td>
        </tr>
    ))

  const handleNextPage = () =>{
    setPage(page+1)
  }

  const handlePrevPage = () =>{
     page -1 ===0 ? setPage(page) :setPage(page-1)
  }

  const handleSort =() =>{

        const sorted = [...listUsers].sort((a,b)=>
            a[saveListUsers.name].toLowerCase() > b[saveListUsers.name].toLowerCase() ? 1 : -1
        );
        setListUser(sorted);

    } 
   
  

    // Search by first name
    const handleSearch = (e) =>{
        setSearchValue(e.target.value)
    }


  return (
      <div className="list-users">
      <div className="search">
        <p>Tim kiem</p>
        <input type="text"  
            onChange={(e) =>handleSearch(e)}
        />
        <button >
            <AiOutlineSearch></AiOutlineSearch>
        </button>
        <button >
            <AiOutlineSortAscending></AiOutlineSortAscending>
        </button><button >
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
        </div>

      
    </div>
  )
}

export default ListUsers