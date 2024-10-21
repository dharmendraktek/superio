"use client";
import Paper from "@/components/common/Paper";
import InnerLayout from "@/components/common/InnerLayout/InnerLayout";
import Pagination from "@/components/common/Pagination";
import { useEffect, useState } from "react";
import { getReq } from "@/utils/apiHandlers";
import CreateTicketModal from "./components/CreateTicketModal";
import moment from "moment";
import DocsPreviewModal from "@/components/common/DocsPreviewModal";
import { reactIcons } from "@/utils/icons";

const tabsName = [
  {name:'Pending'},
  {name:'Working'},
  {name:'Resolve'},
]

const tabs = [
  {name:'My Tickets'},
  {name:'Assigned Tickets'},
]

const Index = () => {

  const [ticketData, setTicketData] = useState([]);
  const [dataCount, setDataCount] = useState();
  const [tab, setTab] = useState("Pending");
  const [doc, setDoc] = useState();
  const [ticketTab, setTicketTab] = useState('My Tickets');

  const handleGetTickets = async() => {
    const response = await getReq(`${ ticketTab == "My Tickets" ? '/tickets/' : '/tickets/assigned_ticket/'}`);
    if(response.status){
      setDataCount(response.data.count)
      setTicketData(response.data.results);  
    }
  }
  
  useEffect(() => {
    handleGetTickets();
  }, [ticketTab])

  return (
    <InnerLayout>
    <section className="px-4">
    <Paper>
      <CreateTicketModal />
      <DocsPreviewModal doc={doc} />
      <div className="">
        <h4>Helpdesk Ticket</h4>
      </div>
      <div className="d-flex my-2 justify-content-between">
      <div className="d-flex">
        {tabs.map((item, index) => {
          return(
             <div key={index} onClick={() => setTicketTab(item.name)} className={`border px-2 border-primary cursor-pointer ${ticketTab == item.name ? "bg-primary text-white fw-700" : ""}  `}>
               <span className="">{item.name}</span>
             </div>
          )
        })
         }
        </div>
        <div className="d-flex gap-2">
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
        <div>
          <button data-bs-target="#createTicketModal" data-bs-toggle="modal" className="theme-btn btn-style-one small">Create</button>
        </div>
        </div>
        </div>
        <div>
        <div className="table_div custom-scroll-sm">
          <table className="default-table ">
            <thead className="position-sticky">
              <tr>
                <th className="" style={{ width: "250px" }}>
                  Subject
                </th>
                <th style={{ width: "150px" }}>Department</th>
                <th style={{ width: "250px" }}>Description</th>
                <th style={{ width: "150px" }}>Atteched Files</th>
                <th style={{ width: "250px" }}>Assignee</th>
                <th style={{ width: "250px" }}>Assigne To </th>
                <th style={{ width: "150px" }}>Priority</th>
                <th style={{ width: "200px" }}>Created</th>
                <th style={{ width: "150px" }}>Status</th>
                {/* <th style={{ width: "300px" }}>Status</th> */}
              </tr>
            </thead>
            <tbody>
              {ticketData?.map((item, index) => {
                let {
                  description_of_issue,
                  subject_detail,
                  image,
                  created_by_detail,
                  department_detail,
                  priority,
                  created_at,
                  updated_at,
                  status,
                } = item;

                return (
                  <>
                    <tr key={index}>
                      <td className="" style={{ width: "250px" }}>
                        {subject_detail?.name || "N/A"}
                      </td>
                      <td className="" style={{ width: "150px" }}>
                        {department_detail?.dept_name}
                      </td>
                      <td className="" style={{ width: "250px" }}>
                        {description_of_issue}
                      </td>
                      <td className="text-capitalize" style={{ width: "150px" }}>
                        {image ?
                       <span data-bs-toggle ="modal" data-bs-target="#docsPreviewModal" onClick={() => setDoc(image)} className="text-primary cursor-pointer">{reactIcons.view}</span> 
                       :"N/A"  
                      }
                      </td>
                      <td className="text-capitalize" style={{ width: "250px" }}>
                        {created_by_detail?.first_name + created_by_detail?.last_name || "N/A"}
                      </td>
                      <td className="text-capitalize" style={{ width: "250px" }}>
                        {department_detail?.dept_name || "N/A"}
                      </td>
                      <td style={{ width: "150px" }} className="text-capitalize">{priority || "N/A"}</td>
                      <td style={{ width: "200px" }} className="text-capitalize">{moment(created_at).format("DD-MM-YYYY, hh:mm A") || "N/A"}</td>
                      <td className="text-capitalize" style={{ width: "150px" }}>
                        {status || "N/A"}
                      </td>
                      {/* <td className="text-capitalize" style={{ width: "160px" }}>
                        {status || "N/A"}
                      </td> */}
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
