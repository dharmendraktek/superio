'use client'
import InnerLayout from "@/components/common/InnerLayout/InnerLayout";
import Paper from "@/components/common/Paper";
import axios from "axios";
import { useEffect } from "react";
import AttendanceData from "./components/AttendanceData";

const index = () => {

  const getAllUsersAttendance = async() => {
    const response = await axios.get('http://10.10.105.228:8000/attendance-details/admin_panel/')
    if(response.status){
      console.log("------------------response data ", response);
    }
  }

  useEffect(() => {
       getAllUsersAttendance();
  }, [])
  return (
    <InnerLayout>
      <section className="user-dashboard">
        <div className="dashboard-outer">
          <div className="row">
            <div className="col-lg-12 px-4 mt-2">
              <Paper>
                 <div>
                  Pending
                  {/* <AttendanceData /> */}
                 </div>
              </Paper>
            </div>
          </div>
        </div>
      </section>
    </InnerLayout>
  );
};

export default index;
