"use client";
import React, { useEffect, useState } from "react";
import { reactIcons } from "@/utils/icons";
import { toast } from "react-toastify";
import moment from "moment";
import Pagination from "@/components/common/Pagination";
import { deleteReq, getReq, patchReq,  } from "@/utils/apiHandlers";
import Loader from "@/components/common/Loader";
import AddClientModal from "@/components/common/AddClientModal";
import AddContactManagerModal from "@/components/common/AddContactManagerModal";
import { clientApprovalField, clientTableField } from "../../clientlist/components/components/constant";
import BtnBeatLoader from "@/components/common/BtnBeatLoader";

const tabsName = [
  { id: 1, name: "ACTIVE CLIENT" },
  { id: 2, name: "INACTIVE CLIENT" },
];

const initialState = {
  client_name: "",
  client_email: "",
  client_cont: "",
  client_website: "",
  client_address: "",
  client_owner: "",
  is_client_active: 1,
  status: "",
  client_country: "",
  client_state: "",
  client_city: "",
};



const ClientApproval = () => {
  const [expand, setExpand] = useState(null);
  const [client, setClient] = useState();
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState();
  const [clientData, setClientData] = useState([]);
  const [active, setActive] = useState(1);
  const [clientNameList, setClientNameList] = useState([]);
  const [contactDetails, setContactDetails] = useState();
  const [page, setPage] = useState(0);
  const [dataCount, setDataCount] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [rejLoading, setRejLoading] = useState(false);
  const [clientId, setClientId] = useState(null);
  const [delLoading, setDelLoading] = useState(false);



  const getClientList = async (search) => {
    setIsLoading(true);
    const response = await getReq(
      `/clients-list/?pending-approval=true&page=${page + 1}${
        search ? `&search=${search}` : ""
      }`
    );
    setIsLoading(false);
    if (response.status) {
      setClientData(response.data.results || response.data);
      setDataCount(response.data.count);
    }
  };

 

  useEffect(() => {
    if(search){
      setPage(0);
      getClientList(search);
    }else {
      getClientList();
    }
  }, [search, active, page]);



  const getClientNameList = async () => {
    const response = await getReq("/clients-dropdown/");
    if (response.status) {
      setClientNameList(response.data);
    }
  };

  const handleApproval = async(id, action) => {
    let data = {
      action:action
    }
    try{
      setClientId(id)
      if(action == "approve"){
       setLoading(true);
      }else{
        setRejLoading(true);
      }
      const response = await patchReq(`/update-client/${id}/`, data);
      setRejLoading(false);
      setLoading(false);
      if(response.status){
        getClientList();
        if(action == "approve"){
          toast.success('Client has been successfully approved');
        }else{
          toast.success('Client has been successfully rejected');
        }
      }
    }catch(err){
        setRejLoading(false);
      setLoading(false);
    }
  }

  const handleDeleteClient = async(id) => {
    try{
      setDelLoading(true);
      const response = await deleteReq(`/delete-client/${id}/`);
      setDelLoading(false);
      if(response.status){
        toast.success('Client has been successfully deleted');
      }
    }catch(err){
      toast.error(err.response || "Something went wrong");
      setDelLoading(false);
    }
  }

 

  return (
    <>
      {isLoading && <Loader />}
      <div className="table_div custom-scroll-sm">
        <table className="default-table">
          <thead className="">
            <tr>
              {clientApprovalField.map((item, index) => {
                return (
                  <React.Fragment key={index}>
                    {/* {item.title == "input" ? (
                      <th key={index} style={{ width: `${item.size}` }}>
                        <input type="checkbox" />
                      </th>
                    ) :
                     ( */}
                      <th  style={{ width: `${item.size}` }} key={index}>
                        {item.title}
                      </th>
                   {/* )} */}
                  </React.Fragment>
                );
              })}
            </tr>
          </thead>
          <tbody className="custom-scroll-sm" style={{height:'300px', overflow:'scroll'}}>
            {clientData?.map((item, index) => {
              return (
                <>
                  <tr key={index} className="">
                    {
                      <td className="d-flex align-items-center justify-content-between" style={{width:"130px"}}>
                        {/* <input type="checkbox" /> */}
                        {item.contact_manager.length > 0 && (
                          <>
                            <div
                              onClick={() => {
                                if (expand == item.id) {
                                  setExpand(null);
                                  setClientData((prev) => {
                                    const update = [...prev];
                                    update[index]["open"] = false;
                                    return update;
                                  });
                                } else {
                                  setExpand(item.id);
                                  setClientData((prev) => {
                                    const update = [...prev];
                                    update[index]["open"] = true;
                                    return update;
                                  });
                                }
                              }}
                              className="mx-2 px-1 d-flex gap-1 justify-content-center align-items-center text-white  rounded-1 cursor-pointer fw-bold fs-6"
                              style={{background:'var(--primary-2nd-color)'}}
                            >
                            <div
                              className="text-white "
                              style={{
                                width: "24px",
                                height: "24px",
                                fontSize: "12px",
                                borderRadius: "3px",
                                background:'var(--primary-2nd-color)'
                              }}
                            >
                              <p className="text-white fw-medium" style={{fontSize:'15px'}}>

                              {item.contact_manager.length}
                              </p>

                            </div>
                            <span className="cursor-pointer text-white fs-4">
                                {item.id == expand ? reactIcons.arrowfillup : reactIcons.arrowfilldown}
                              </span>
                            </div>
                          </>
                        )}
                      </td>
                    }
                    <td style={{width:"150px"}}>{item.id}</td>
                    <td
                     style={{width:"250px"}}
                      className=" hover-overlay cursor-pointer text-primary"
                      data-bs-toggle="offcanvas"
                      data-bs-target="#addClientModal"
                      aria-controls="offcanvasRight"
                      onClick={() => setClient(item)}
                    >
                      {item.client_name}
                    </td>
                    <td style={{width:"300px"}}>{item.client_email || 'N/A'}</td>
                    <td style={{width:"300px"}}>{item.client_cont || 'N/A'}</td>
                    <td style={{width:"300px"}}>{item.client_website || 'N/A'}</td>
                    <td style={{width:"150px"}}>{item.status || 'N/A'}</td>
                    {/* <td className="remaining">{item.category}</td> */}
                    <td style={{width:"200px"}}>{item.owner_name || 'N/A'}</td>
                    {/* <td className="status">{item.business_unit}</td> */}
                    {/* <td className="expiry">{item.job_posting}</td> */}
                    <td className="" style={{ width: "200px" }}>
                      {(item.created_by.first_name || "N/A") + " " + (item.created_by.last_name || "N/A")}
                    </td>
                    <td className="" style={{ width: "200px" }}>
                      {(item.updated_by.first_name || "N/A") + " " + (item.updated_by.last_name || "N/A")}
                    </td>
                    <td className="" style={{ width: "250px" }}>
                      {item.created_at ? moment(item.created_at).format("DD-MM-YYYY hh:mm A") : 'N/A'}
                    </td>
                    <td className="" style={{ width: "250px" }}>
                      {item.updated_at ? moment(item.updated_at).format("DD-MM-YYYY hh:mm A") : 'N/A'}
                    </td>
                    <td style={{width:"260px"}}>
                       <div className="d-flex gap-1">
                        <button className="theme-btn btn-style-four small" onClick={() => handleApproval(item.id, 'approve')}>{loading && item.id == clientId ? <BtnBeatLoader /> :"APPROVE"}</button>
                        <button className="theme-btn btn-style-four small" onClick={() => handleApproval(item.id, 'disapprove')}>{rejLoading && item.id == clientId ? <BtnBeatLoader /> :"REJECT"}</button>
                        <button className="theme-btn btn-style-four small" onClick={() => handleDeleteClient(item.id)}>{rejLoading && item.id == clientId ? <BtnBeatLoader /> :"DELETE"}</button>
                       </div>
                    </td>
                  </tr>
                </>
              );
            })}
            {clientData.length == 0 && (
              <tr className="text-center mt-5">
                <td colSpan={11}>No data found</td>
              </tr>
            )}
            {/* End tr */}
          </tbody>
        </table>
      </div>
      {dataCount > 25 && (
        <Pagination
          page={page}
          setPage={setPage}
          dataCount={dataCount}
          pageSize={25}
          //  setPageSize={setPageSize}
        />
      )}
    </>
  );
};

export default ClientApproval;
