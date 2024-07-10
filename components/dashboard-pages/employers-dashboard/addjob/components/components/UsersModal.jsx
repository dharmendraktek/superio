'use client'

import { getReq } from "@/utils/apiHandlers"
import { reactIcons } from "@/utils/icons";
import axios from "axios";
import { useEffect, useState } from "react"


const UsersModal = ({usersList, form, setForm, setUsersList, setTeamId, teamId, handleGetUsersList, setAssignList, assignList}) => {
  const [teamList, setTeamList] = useState([]);

  useEffect(() =>{
    
    handleGetTeamName();
  }, [])

  useEffect(() => {
    if(teamId)
    handleGetTeamMamber();
    else
    handleGetUsersList()

  }, [teamId])


  const handleGetTeamName = async() => {
    const response = await getReq(`/team-list/`);
    if(response.status){
      setTeamList(response.data);
    }
  }


  const handleGetTeamMamber = async() => {
    const response = await getReq(`/team-users/${teamId}/`);
    if(response.status){
      setUsersList(response.data);
    }
  }
  
    return(
        <div className="modal fade" id="usersModal" tabindex="-1" aria-labelledby="usersModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-xl">
          <div className="modal-content">
            <div className="modal-header border border-bottom-primary">
              <h5 className="modal-title" id="usersModalLabel">Assign Team Members</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
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
                        <li className="d-flex gap-2 cursor-pointer" onClick={() => setTeamId(item.id)}>
                          <span className="fs-5">{reactIcons.team}</span>
                          <span className="fs-6">{item.team_name}</span>
                        </li>
                      )
                  })
                  }
                     </div>
                   </div>
                </div>
                <div className="col-5">
                    <input type="text" placeholder="Seach..." className="client-form-input" />
                  <div className="mt-2 custom-scroll-sm" style={{minHeight:"250px",maxHeight:'345px', overflowY:'scroll'}}>
                    {usersList?.map((item, index) => {
                      return(
                    <div className="d-flex gap-2 my-1" key={index}>
                       <input type="checkbox" 
                        checked={form?.assign?.find(_item => _item == item.id)}
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
                       {teamId ?
                       <span>{item?.user?.first_name} {item?.user?.last_name} ({item.user.email})</span>
                       :
                       <span>{item.first_name} {item.last_name} ({item.email})</span>
                       }
                    </div>
                      )
                    })
                    }
                  </div>
                </div>
                <div className="col-4">
                <div>
                  {assignList.map((item) => {
                    return <p>{item.first_name} ({item.email})</p>;
                  })}
                </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button  type="button" className="theme-btn btn-style-one small">Save</button>
              <button type="button" className="theme-btn btn-style-four small" data-bs-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
    )
}

export default UsersModal;