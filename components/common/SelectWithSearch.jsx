'use client'
import { getReq } from "@/utils/apiHandlers";
import { reactIcons } from "@/utils/icons";
import { useEffect, useState } from "react";

const SelectWithSearch = ({setForm,form ,name, email=true}) => {
  const [usersList, setUsersList] = useState([]);
  const [userName, setUserName] = useState("");
  const [search, setSearch] = useState('');
  const [open, setOpen] = useState(false);

  useEffect(() => {
      handleGetUsersList()
  }, [search])

  const handleGetUsersList = async () => {
    const response = await getReq(
      `/users/${search ? `?search=${search}` : ""}`
    );
    if (response.status) {
      setUsersList(response.data);
    }
  };

  useEffect(() => {
  if(form[name] && usersList.length > 0 ){
    let user =   usersList.find((item) => item.id == form[name])
     setUserName(user);
  }
  }, [form[name], usersList])

 return(
    <div className="position-relative">
    <div
      className="client-form-input d-flex justify-content-between cursor-pointer"
      onClick={() => setOpen(!open)}
      // onMouseLeave={() => setOpen(false)}
    >
      {userName ?
      <span> {userName.first_name + ' ' + userName.last_name+ ' '} {email && `(${userName.email})`}</span>
      :
      <span></span>
      }
      <span className=" float-end">{reactIcons.downarrow}</span>
    </div>
    {open && (
      <div
        className="position-absolute bg-white border border-1 w-100 px-2 table_div_custom custom-scroll-sm"
        style={{ top: "33px", zIndex: 10000, height:'350px' }}
        onMouseLeave={() => setOpen(false)}
      >
        <div className="my-2">
          <input className="border px-2 border-primary rounded-1 w-100 " placeholder="Search here..." type='text' onChange={(e) => setSearch(e.target.value)}/>
        </div>
        {usersList.map((item, index) => {
          return (
            <div key={index} className="hover-bg-change">
              <span className="mx-2" onClick={() =>{ 
                setUserName(item);
                setForm((prev) => ({...prev, [name]:item.id}))
                setOpen(false);
                setSearch('')
                }}>{item.first_name} {item.last_name} ({item.email})</span>
            </div>
          );
        })}
      </div>
    )}
  </div>
 )   
}

export default SelectWithSearch;