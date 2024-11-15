"use client";
import Paper from "@/components/common/Paper";
import { useEffect, useState } from "react";
import LeaveRequestForm from "./components/LeaveRequestForm";
import InnerLayout from "@/components/common/InnerLayout/InnerLayout";
import { getApiReq, getReq } from "@/utils/apiHandlers";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import moment from "moment";

const Index = () => {
  const [openForm, setOpenForm] = useState(false);
  const [tab, setTab] = useState(false);
  const [leaveData, setLeaveData] = useState([]);
  // const employee_details = useSelector((state) => )

  const getLeavesHistory = async() => {
    try{
      const response = await getReq('/leaves/');
      console.log("-------------respoern ", response.data.results);
      if(response.status){
      setLeaveData(response.data.results || response.data);
      }else if(!response.status){
        
      }
    }catch(err){
       toast.error('Some Internal Server occured')
    }
  }

  useEffect(() => {
    getLeavesHistory();
  }, [])

  return (
    <InnerLayout>
    <section className="px-4">
    <Paper>
      <div className="row">
      {openForm ? (
        <LeaveRequestForm setOpenForm={setOpenForm} />
      ) : (
        <div>
             <div className="d-flex justify-content-between py-2">
            <h4>Leave Management System</h4>
          </div>
          <div className="d-flex justify-content-between py-2">
            <div className="d-flex border border-primary ">
                <div onClick={() => setTab(false)} className={`px-2  cursor-pointer fw-medium ${tab ? 'bg-white' : 'bg-primary text-white fw-medium'}`}>Balance History</div>
                <div onClick={() => setTab(true)} className={`px-2 cursor-pointer fw-medium ${tab ? 'bg-primary text-white fw-medium' : 'bg-white'}`}>Apply History</div>
            </div>
            <button className="theme-btn btn-style-one small" onClick={() => setOpenForm(true)}>Create</button>
          </div>
          {tab ?
            <div className="table_div  custom-scroll-sm">
            <table className="default-table ">
              <thead>
                <tr>
                  <th style={{ width: "100px" }}>Id</th>
                  <th style={{ width: "100px" }}>Form Date</th>
                  <th style={{ width: "100px" }}>To Date</th>
                  <th style={{ width: "150px" }}>Nature of Leave</th>
                  <th style={{ width: "250px" }}>Reason</th>
                  <th style={{ width: "150px" }}>Applied On</th>
                  <th style={{ width: "220px" }}>Document</th>
                  <th style={{ width: "220px" }}>Status</th>
                  <th style={{ width: "100px" }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {leaveData.map((item) => {
                  const  {
                    id,
                    applied_date,
                    nature_of_leave,
                    leave_type,
                    leave_session,
                    from_date,
                    to_date,
                    return_date,
                    reason,
                    document,
                    status,
                    created_at,
                    updated_at,
                    user,
                    actual_leave_balance,
                    reporting_manager,
                    secondary_reporting_manager,
                    covering_employee,
                    people_in_cc
                  } = item;
                   return(
                <tr key={id}>
                  <td className="" style={{ width: "100px" }}>
                    {id || "N/A"}
                  </td>
                  <td className="" style={{ width: "100px" }}>
                    {moment(from_date).format("DD-MM-YYYY")}
                  </td>
                  <td className="" style={{ width: "100px" }}>
                  {moment(to_date).format("DD-MM-YYYY")}
                  </td>
                  <td className="" style={{ width: "150px" }}>
                    {nature_of_leave}
                  </td>
                  <td className="" style={{ width: "250px" }}>
                    {reason}
                  </td>
                  <td className="" style={{ width: "150px" }}>
                    {moment(applied_date).format("DD-MM-YYYY")}
                  </td>
                  <td className="" style={{ width: "220px" }}>
                    <button className="theme-btn btn-style-three small">View</button>
                  </td>
                  <td className="" style={{ width: "220px" }}>
                    {status}
                  </td>
                  <td className="" style={{ width: "100px" }}>
                    11
                  </td>   
                </tr>
                    
                   )
                })
                }
              </tbody>
            </table>
          </div>
          :
          <div className="table_div  custom-scroll-sm">
            <table className="default-table ">
              <thead>
                <tr>
                  <th style={{ width: "200px" }}>Name</th>
                  <th style={{ width: "100px" }}>Empcode</th>
                  <th style={{ width: "210px" }}>Total Working Days</th>
                  <th style={{ width: "140px" }}>Total Leave</th>
                  <th style={{ width: "150px" }}>Opening Leave</th>
                  <th style={{ width: "150px" }}>Deduction Leave</th>
                  <th style={{ width: "220px" }}>Remaining Leave Balance</th>
                  <th style={{ width: "220px" }}>No of Days Deduction</th>
                  <th style={{ width: "100px" }}>Work Days</th>
                  <th style={{ width: "200px" }}>Carry forward Leave</th>
                  <th style={{ width: "170px" }}>Final Leave Balance</th>
                </tr>
              </thead>
              <tbody>
                {/* {leaveData.map((item) => {
                  const  {
                    id,
                    applied_date,
                    nature_of_leave,
                    leave_type,
                    leave_session,
                    from_date,
                    to_date,
                    return_date,
                    reason,
                    document,
                    status,
                    created_at,
                    updated_at,
                    user,
                    actual_leave_balance,
                    reporting_manager,
                    secondary_reporting_manager,
                    covering_employee,
                    people_in_cc
                  } = item;
                   return(
                    <tr>
                      <td>1</td>
                    </tr>
                   )
                })
                } */}
                <tr>
                  <td style={{ width: "200px" }}>Dharmendra Patel</td>
                  <td style={{ width: "100px" }}>1972</td>
                  <td className="text-center" style={{ width: "210px" }}>
                    22
                  </td>
                  <td className="text-center" style={{ width: "140px" }}>
                    0
                  </td>
                  <td className="text-center" style={{ width: "150px" }}>
                    0
                  </td>
                  <td className="text-center" style={{ width: "150px" }}>
                    0
                  </td>
                  <td className="text-center" style={{ width: "220px" }}>
                    0.83
                  </td>
                  <td className="text-center" style={{ width: "220px" }}>
                    10
                  </td>
                  <td className="text-center" style={{ width: "100px" }}>
                    11
                  </td>
                  <td className="text-center" style={{ width: "200px" }}>
                    0
                  </td>
                  <td className="text-center" style={{ width: "170px" }}>
                    0.83
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          }
        </div>
      )}
      </div>
    </Paper>
    </section>
    </InnerLayout>
  );
};

export default Index;
