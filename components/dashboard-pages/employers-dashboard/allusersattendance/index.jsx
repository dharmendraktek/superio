'use client'
import InnerLayout from "@/components/common/InnerLayout/InnerLayout";
import Paper from "@/components/common/Paper";
import axios from "axios";
import { useEffect } from "react";
import AttendanceData from "./components/AttendanceData";

const index = () => {

  
  return (
    <InnerLayout>
      <section className="user-dashboard">
        <div className="dashboard-outer">
          <div className="row">
            <div className="col-lg-12 px-4 mt-2">
              <Paper>
                 <div>
                  <AttendanceData />
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
