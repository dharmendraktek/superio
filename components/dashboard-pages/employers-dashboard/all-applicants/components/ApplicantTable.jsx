"use client";

import Loader from "@/components/common/Loader";
import Pagination from "@/components/common/Pagination";
import { getReq } from "@/utils/apiHandlers";
import { reactIcons } from "@/utils/icons";
import moment from "moment";
import Link from "next/link";
import { use, useEffect, useState } from "react";

// export const applicantData = [
//   {
//     id: 672652,
//     name: "Anil Patel",
//     email: "anilpatel365@gmail.com",
//     mobile: "9610465261",
//     city: "Indore",
//     source: "Dice",
//     state: "Madhyapradesh",
//     status: "New Lead",
//     title: "Full stack developer",
//     ownership: "-",
//     authorization: "-",
//   },
// ];

const ApplicantTable = () => {
  const [search, setSearch] = useState();
  const [page, setPage] = useState(0);
  const [dataCount, setDataCount] = useState();
  const [applicantData, setApplicantData] = useState([]); 
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    handleGetApplicantList();
  }, [])

  const handleGetApplicantList = async() => {
    // setIsLoading(true);
    const response = await getReq('/applicants/');
    setIsLoading(false);
    if(response.status){
          setApplicantData(response.data);
    }
  }

  return (
    <div>
      {isLoading &&
         <Loader />
      }
      <div className="d-flex justify-content-between">
        <div className="position-relative">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ width: "350px" }}
            className="border border-primary px-4 rounded-1"
            placeholder="Search anything..."
          />
          <span
            className="position-absolute fs-4 text-primary"
            style={{ left: "2px" }}
          >
            {reactIcons.search}
          </span>
          {search && (
            <span
              onClick={() => setSearch("")}
              className="position-absolute cursor-pointer	  text-primary fs-5"
              style={{ right: "8px" }}
            >
              {reactIcons.close}
            </span>
          )}
          {/* <div>
                  <button>Upload File</button>
                </div> */}
        </div>
        <Link href="/employers-dashboard/all-applicants/add-applicant">
          <button className="bg-primary px-3 text-white rounded-1 py-1">
            + New
          </button>
        </Link>
      </div>
      <div className="mt-2">
        <div className="table_div custom-scroll-sm">
          <table className="default-table ">
            <thead className="position-sticky">
              <tr>
                <th style={{width:'100px'}}>
                  <input type="checkbox" />
                </th>
                <th className="" style={{width:'150px'}}>Applicant ID</th>
                <th style={{width:'200px'}}>Applicant Name</th>
                <th style={{width:'250px'}}>Job Title</th>
                <th style={{width:'300px'}}>Email Address</th>
                <th style={{width:'300px'}}>Mobile Number</th>
                {/* <th style={{width:'300px'}}>Primary Skills</th>
                <th style={{width:'200px'}}>Secondary Skills</th> */}
                <th style={{width:'150px'}}>City</th>
                <th style={{width:'200px'}}>Source</th>
                <th style={{width:'200px'}}>State</th>
                <th style={{width:'200px'}}>Applicant Status</th>
                <th style={{width:'250px'}}>Ownership</th>
                <th style={{width:'250px'}} className="">Work Authorization</th>
                <th style={{width:'250px'}} >Created By</th>
                <th style={{width:'200px'}} >Created On</th>
              </tr>
            </thead>
            <tbody>
              {applicantData.map((item, index) => {
                return (
                  <tr key={index}>
                    <td  style={{width:'100px'}}>
                      <input type="checkbox" />
                    </td>
                    <td className="" style={{width:'150px'}}>{item.id}</td>
                    <td className="" style={{width:'200px'}}>
                    <Link
                          href="/employers-dashboard/all-applicants/[id]"
                          as={`/employers-dashboard/all-applicants/${item.id}`}
                    >
                      {item.firstname} {item.middlename} {item.lastname}
                    </Link>
                      </td>
                    <td className="" style={{width:'250px'}}>{item.job_title}</td>
                    <td className="" style={{width:'300px'}}>{item.email}</td>
                    <td className="" style={{width:'300px'}}>{item.mobile}</td>
                    {/* <td style={{width:'300px'}}>primary</td>
                    <td style={{width:'300px'}}>secondary</td> */}
                    <td className="" style={{width:'150px'}}>{item.city}</td>
                    <td className="" style={{width:'200px'}}>{item.source}</td>
                    <td className="" style={{width:'200px'}}>{item.state}</td>
                    <td className="" style={{width:'200px'}}>{item.status}</td>
                    <td className="c" style={{width:'250px'}}>{item.ownership}</td>
                    <td className="text-center" style={{width:'250px'}}>
                      {item.authorization}
                      {/* <div className="option-box text-center">
                    <ul className="option-list">
                      <li>
                        <button
                          onClick={() => setItem(item)}
                          data-bs-toggle="modal"
                          data-bs-target="#userUpdateModal"
                          data-text="Edit User"
                        >
                          
                          <span className="las la-edit"></span>
                        </button>
                      </li>
                      <li>
                        <button
                          onClick={
                            () => {
                              if (active == 1) {
                                handleDeleteUser(item.id);
                              } else {
                                handleActiveUser(item.id);
                              }
                            }
                            // setUserId(item.id)
                          }
                          // data-bs-toggle="modal"
                          //     data-bs-target="#userDeleteModal"

                          data-text={`${
                            active == 1 ? "Inactive User" : "Active User"
                          }`}
                        >
                          <span
                            className={`${
                              active == 1
                                ? "las la-times-circle"
                                : "las la-check-square"
                            }`}
                          ></span>
                        </button>
                      </li>
                    </ul>
                  </div> */}
                    </td>
                    <td style={{width:'250px'}}>{item.created_by}</td>
                    <td style={{width:'200px'}}>{moment(item.created_at).format('DD-MM-YYYY  hh:mm A')}</td>
                  </tr>
                );
              })}
              {/* End tr */}
              {applicantData.length == 0 && (
                <tr className="text-center mt-5">
                  <td colSpan={11}>No data found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        {dataCount > 25 &&
        <Pagination dataCount={dataCount} page={page} setPage={setPage} />
        }
      </div>
    </div>
  );
};

export default ApplicantTable;
