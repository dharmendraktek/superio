"use client";

import { getReq } from "@/utils/apiHandlers";
import { reactIcons } from "@/utils/icons";
import { useEffect, useState } from "react";

const MultiSelectClient = ({
  selectedClientIds,
  setSelectedClientIds,
  withEmail = false,
  showUsersAbove = false,
  showUsersbelow = false,
}) => {
  const [clientList, setClientList] = useState([]);
  const [selectedList, setSelectedList] = useState([]);
  const [search, setSearch] = useState("");


  useEffect(() => {
    if(selectedClientIds.length == 0){
      setSelectedList([]);
    }
  }, [selectedClientIds]);


  function debounce(func, delay) {
    let timer;
    return function (...args) {
      clearTimeout(timer);
      timer = setTimeout(() => func.apply(this, args), delay);
    };
  }
  
  const handleGetClientNames = async () => {
    const response = await getReq(
      `/clients-dropdown/${search ? `?name=${search}` : ""}`
    );
    if (response.status) {
      setClientList(response.data);
    }
  };
  
  const debouncedHandleGetUsersList = debounce(handleGetClientNames, 0);
  
  useEffect(() => {
    debouncedHandleGetUsersList();
    // No explicit cleanup required with this debounce implementation
  }, [search]);

  

  useEffect(() => {
    if(selectedClientIds.length > 0){
      const filteredUsers = clientList.filter(user => selectedClientIds.includes(user.id));
      setSelectedList(filteredUsers)
    }
  }, [selectedClientIds, clientList])

  const handleCheckboxChange = (item) => {
    setSearch('');
    const isSelected = selectedList.find((selected) => selected.id === item.id);
    
    if (isSelected) {
      setSelectedList((prev) => prev.filter((user) => user.id !== item.id));
      setSelectedClientIds((prev) => prev.filter((id) => id !== item.id));
    } else {
      const newUser = {
        first_name: item.first_name + " " + item.last_name,
        id: item.id,
      };
      setSelectedList((prev) => [...prev, newUser]);
      setSelectedClientIds((prev) => [...prev, item.id]);
    }
  };

  return (
    // <div className="position-relative cursor-pointer">
    //   <div
    //     className={`d-flex ${selectedList.length > 0 ? "justify-content-between" : "justify-content-end"}`}
    //     onClick={() => setOpen(!open)}
    //     style={{ minHeight: "36px", maxHeight: "fit-content", borderBottom:"1px solid black", width:'100%' }}
    //   >
    //     {showUsersAbove && (
    //       <div className="d-flex justify-content-start  flex-wrap gap-2">
    //         {selectedList.map((item) => (
    //           <div
    //             key={item.id}
    //             className="my-1 px-1 text-black fw-medium justify-content-start d-flex gap-1 rounded-1"
    //             style={{
    //               background: "var(--primary-2nd-color)",
    //             }}
    //           >
    //             <span>{item.first_name} {item.last_name}</span>
    //           </div>
    //         ))}
    //       </div>
    //     )}
    //     <span className="float-end">{reactIcons.downarrow}</span>
    //   </div>
    //   {open && (
    //     <div
    //       className="position-absolute bg-white border border-1 w-100 px-2"
    //       style={{
    //         top: "33px",
    //         zIndex: 10000,
    //         height: "200px",
    //         overflow: "auto",
    //       }}
    //     >
    //       <div className="my-1">
    //         <input
    //           type="text"
    //           value={search}
    //           onChange={(e) => setSearch(e.target.value)}
    //           placeholder="Search here..."
    //           className="px-1 bg-background"
    //         />
    //       </div>
    //       {clientList.map((item) => (
    //         <div key={item.id} className="d-flex align-items-center">
    //           <input
    //             type="checkbox"
    //             checked={selectedList.some((selected) => selected.id === item.id)}
    //             onChange={() => handleCheckboxChange(item)}
    //           />
    //           <span className="mx-2">
    //             {item.first_name} {item.last_name} {withEmail &&(item.email)}
    //           </span>
    //         </div>
    //       ))}
    //     </div>
    //   )}
    //   {showUsersbelow && (
    //     <div className="flex-wrap gap-2">
    //       {selectedList.map((item) => (
    //         <div
    //           key={item.id}
    //           className="my-1 px-1 d-flex align-items-center text-black fw-medium gap-1 rounded-1"
    //         >
    //           <span className="fs-5">{reactIcons.user}</span>
    //           <p className="fw-medium text-black">{item.first_name}</p>
    //         </div>
    //       ))}
    //     </div>
    //   )}
    // </div>
    <div className="dropdown position-relative cursor-pointer">
  <div
    className={`d-flex ${selectedList.length > 0 ? "justify-content-between" : "justify-content-end"}`}
    data-bs-toggle="dropdown"
    style={{
      minHeight: "36px",
      maxHeight: "fit-content",
      borderBottom: "1px solid black",
      width: "100%",
    }}
  >
    {showUsersAbove && (
      <div className="d-flex justify-content-start flex-wrap gap-2">
        {selectedList.map((item) => (
          <div
            key={item.id}
            className="my-1 px-1 text-black fw-medium justify-content-start d-flex gap-1 rounded-1"
            style={{
              background: "var(--primary-2nd-color)",
            }}
          >
            <span>
              {item.client_name} 
            </span>
          </div>
        ))}
      </div>
    )}
    <span className="float-end">{reactIcons.downarrow}</span>
  </div>
  <div
    className="dropdown-menu position-absolute bg-white border border-1 w-100 px-2"
    style={{
      top: "33px",
      zIndex: 10000,
      height: "200px",
      overflow: "auto",
    }}
  >
    <div className="my-1">
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search here..."
        className="px-1 bg-background"
      />
    </div>
    {clientList.map((item) => (
      <div key={item.id} className="d-flex align-items-center">
        <input
          type="checkbox"
          checked={selectedList.some((selected) => selected.id === item.id)}
          onChange={() => handleCheckboxChange(item)}
        />
        <span className="mx-2">
          {item.client_name} 
          {/* {item.last_name} {withEmail && item.email} */}
        </span>
      </div>
    ))}
  </div>
  {showUsersbelow && (
    <div className="flex-wrap gap-2">
      {selectedList.map((item) => (
        <div
          key={item.id}
          className="my-1 px-1 d-flex align-items-center text-black fw-medium gap-1 rounded-1"
        >
          <span className="fs-5">{reactIcons.user}</span>
          <p className="fw-medium text-black">{item.client_name}</p>
        </div>
      ))}
    </div>
  )}
</div>

  );
};

export default MultiSelectClient;
  