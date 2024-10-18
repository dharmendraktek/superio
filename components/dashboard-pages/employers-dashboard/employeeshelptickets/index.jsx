"use client";
import Paper from "@/components/common/Paper";
import InnerLayout from "@/components/common/InnerLayout/InnerLayout";
import Pagination from "@/components/common/Pagination";
import { useEffect, useState } from "react";
import { getReq } from "@/utils/apiHandlers";

const tabsName = [
  {name:'Pending'},
  {name:'Working'},
  {name:'Resolve'},
]

const Index = () => {

  const [ticketData, setTicketData] = useState([]);
  const [dataCount, setDataCount] = useState();
  const [tab, setTab] = useState("Pending");

  const handleGetTickets = async() => {
    const response = await getReq('/tickets/all_ticket/');
    if(response.status){
      setDataCount(response.data.count)
      setTicketData(response.data.results && response.data);  
    }
  }
  
  useEffect(() => {
    handleGetTickets();
  }, [])

  return (
    <InnerLayout>
    <section className="px-4">
    <Paper>
      <div className="">
        <h4>Employees Helpdesk Tickets</h4>
      </div>
      <div className="d-flex my-2 justify-content-between">
        <div className="d-flex">
        {tabsName.map((item, index) => {
          return(
             <div key={index} onClick={() => setTab(item.name)} className={`border px-2 border-primary cursor-pointer ${tab == item.name ? "bg-primary text-white fw-700" : ""}  `}>
               <span className="">{item.name}</span>
             </div>
          )
        })
         }
        </div>
        {/* <div>
          <button data-bs-target="#createTicketModal" data-bs-toggle="modal" className="theme-btn btn-style-one small">Create</button>
        </div> */}
        </div>
        <div>
        <div className="table_div custom-scroll-sm">
          <table className="default-table ">
            <thead className="position-sticky">
              <tr>
                <th className="" style={{ width: "200px" }}>
                  Subject
                </th>
                <th style={{ width: "100px" }}>Department</th>
                <th style={{ width: "200px" }}>Description</th>
                <th style={{ width: "200px" }}>Atteched Files</th>
                <th style={{ width: "250px" }}>Assignee</th>
                <th style={{ width: "200px" }}>Assigne To </th>
                <th style={{ width: "150px" }}>Priority</th>
                <th style={{ width: "160px" }}>Created</th>
                <th style={{ width: "200px" }}>Status</th>
                <th style={{ width: "300px" }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {ticketData?.map((item, index) => {
                let {
                  assigned_date,
                  job_code,
                  job_create_date,
                  contact_manager,
                  job_title,
                  number_of_position,
                  lob_name,
                  client,
                  job_location,
                  end_client,
                  job_type,
                  account_manager,
                  assigned_to,
                  assigned_time,
                  submissions_done,
                  job_status,
                  tagged_count,
                } = item;

                return (
                  <>
                    <tr key={index}>
                      <td className="" style={{ width: "200px" }}>
                        {moment(assigned_date).format("DD-MM-YYYY  hh:mm A")}
                      </td>
                      <td className="" style={{ width: "100px" }}>
                        {job_code}
                      </td>
                      <td className="text-capitalize" style={{ width: "200px" }}>
                        {job_title}
                      </td>
                      <td className="text-capitalize" style={{ width: "200px" }}>
                        {client || "N/A"}
                      </td>
                      <td className="text-capitalize" style={{ width: "250px" }}>
                        {contact_manager || "N/A"}
                      </td>
                      <td style={{ width: "200px" }} className="text-capitalize">{end_client || "N/A"}</td>
                      <td style={{ width: "150px" }} className="text-capitalize">{lob_name || "N/A"}</td>
                      <td className="text-capitalize" style={{ width: "160px" }}>
                        {job_type || "N/A"}
                      </td>
                      <td className="text-capitalize" style={{ width: "200px" }}>
                        {job_location || "N/A"}
                      </td>
                      <td className="text-capitalize" style={{ width: "300px" }}>
                        {job_location || "N/A"}
                      </td>
                    </tr>
                  </>
                );
              })}
              {/* End tr */}
              {ticketData?.length == 0 && (
                <tr className="mt-5 ">
                  <td colSpan={4} className="text-center">
                    No data found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        {dataCount > 25 && (
          <Pagination dataCount={dataCount} page={page} setPage={setPage} />
        )}
        </div>
    </Paper>
    </section>
    </InnerLayout>
  );
};

export default Index;
