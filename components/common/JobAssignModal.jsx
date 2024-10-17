'use client'

import { getReq, postApiReq } from "@/utils/apiHandlers"
import { reactIcons } from "@/utils/icons";
import axios from "axios";
import { assign } from "lodash";
import { use, useEffect, useState } from "react"
import { toast } from "react-toastify";
import BtnBeatLoader from "./BtnBeatLoader";


const JobAssignModal = ({jobId, handleReload}) => {
  const [teamList, setTeamList] = useState([]);
  const [usersList, setUsersList] = useState([]);
  const [form, setForm] = useState({
    assign:[]
  });
  const [teamId, setTeamId] = useState();
  const [assignList, setAssignList] = useState([]);
  const [search, setSearch] = useState();
  const [isLoading, setIsLoading] = useState(false);
  
  const handleGetUsersList = async () => {
    const response = await getReq(
      `/users/${search ? `?search=${search}` : ""}`
    );
    if (response.status) {
      setUsersList(response.data);
    }
  };

  const handleClose = (item) => {
    let temp = [...assignList];
    let newTemp = temp.filter((_item) => _item.id !== item.id);
    setAssignList(newTemp);
    setForm((prev) => ({
      ...prev,
      assign: prev.assign.filter((_item, _index) => _item !== item.id),
    }));
  };    

  useEffect(() =>{
    
    handleGetTeamName();
  }, [])

  useEffect(() => {
    if(teamId)
    handleGetTeamMamber();
    else if(!teamId)
    handleGetUsersList()

  }, [teamId, search])


  const handleGetTeamName = async() => {
    const response = await getReq(`/team-list/`);
    if(response.status){
      setTeamList(response.data);
    }
  }


  const handleGetTeamMamber = async() => {
    const response = await getReq(`/team-users/${teamId}/${search ? `?search=${search}` : ''}`);
    if(response.status){
      let merged = response.data.map((item) => {
        return {
          'teamname':item.teamname,
          ...item.user
        }
      })
      setUsersList(merged);
    }
  }

  const handleClear = () => {
    setTeamId('');
    setSearch('');
    handleGetUsersList();
  }
   
  const handleAssingJob = async () => {
    try{
      setIsLoading(true);
      const response = await postApiReq(`/jobs/${jobId}/assign/`, form);
      setIsLoading(false);
      if (response.status) {
        toast.success('Job has been assigned successfully')
        setForm((prev) => ({...prev, assign:[]}))
        handleReload();
        setAssignList([]);
        let btn = document.getElementById('btnClose');
        btn.click();
      }
    }catch(err){
       toast.error(err.response || 'Somthing went wrong')
       setIsLoading(false);
    }
  };
  


    return(
        <div className="modal fade" id="jobAssignModal" tabindex="-1" aria-labelledby="jobAssignModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-xl">
          <div className="modal-content">
            <div className="modal-header border border-bottom-primary">
              <h5 className="modal-title" id="jobAssignModalLabel">Assign Team Members</h5>
              <button type="button" id="btnClose" className="btn-close text-white" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <div className="row">
                <div className="col-3">
                   <div>
                     <h5 className="text-primary cursor-pointer" onClick={() => setTeamId(null)}>All Users</h5>
                     <h5>Teams</h5>
                     <div className="custom-scroll-sm" style={{minHeight:"250px",maxHeight:'300px', overflowY:'scroll'}}>
                  {teamList.map((item) => {
                      return(
                        <li className={`d-flex gap-2 cursor-pointer ${item.id == teamId ? 'text-primary' : ''}`} onClick={() => setTeamId(item.id)}>
                          <span className="fs-5">{reactIcons.team}</span>
                          <span className="fs-6 fw-semibold">{item.team_name}</span>
                        </li>
                      )
                  })
                  }
                     </div>
                   </div>
                </div>
                <div className="col-5">
                    <input type="text" placeholder="Seach..." className="client-form-input" onChange={(e) => setSearch(e.target.value)} />
                  <div className="mt-2 custom-scroll-sm" style={{minHeight:"250px",maxHeight:'345px', overflowY:'scroll'}}>
                    {usersList?.map((item, index) => {
                      return(
                    <div className="d-flex gap-2 my-1" key={index}>
                       <input type="checkbox" 
                        checked={assignList.find(_item => _item.id == item.id) ? true : false}
                        onChange={(e) => {
                          if (e.target.checked) {
                            let temp = [...assignList]
                            temp.push(item);
                            setAssignList(temp)
                            setForm((prev) => ({
                              ...prev,
                              assign:[...prev.assign, item.id]
                                // assign: [
                              //   ...prev.assign,
                              //   { id: item.id },
                              // ],
                            }));
                          } else {
                            let temp = [...assignList]
                            let newTemp = temp.filter((_item) => _item.id !== item.id)
                            setAssignList(newTemp)
                            setForm((prev) => ({
                              ...prev,
                              assign: prev.assign.filter(
                                (_item, _index) => _item !== item.id
                              ),
                             
                            }));
                          }
                        }}
                       
                       />
                       <span className="text-primary">{item?.first_name} {item?.last_name} ({item?.email})</span>
                    </div>
                      )
                    })
                    }
                  </div>
                </div>
                <div className="col-4">
                <div>
                  {assignList.map((item) => {
                    return(
                      <div className="d-flex gap-2">
                        <p className="text-black">{item.first_name} ({item.email})</p>
                        <span onClick={() => handleClose(item)} className="text-danger cursor-pointer">{reactIcons.close}</span>
                      </div>
                    ) 
                  })}
                </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button  type="button" className="theme-btn btn-style-one small"  onClick={handleAssingJob} disabled={isLoading}>{isLoading ? <BtnBeatLoader /> : "Save"}</button>
              <button type="button" className="theme-btn btn-style-four small" data-bs-dismiss="modal" onClick={handleClear}>Close</button>
            </div>
          </div>
        </div>
      </div>
    )
}

export default JobAssignModal;