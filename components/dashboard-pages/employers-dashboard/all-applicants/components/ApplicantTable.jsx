"use client";

import Pagination from "@/components/common/Pagination";
import { reactIcons } from "@/utils/icons";
import Link from "next/link";
import { use, useState } from "react";

export const applicantData = [
  {
    id: 672652,
    name: "Anil Patel",
    email: "anilpatel365@gmail.com",
    mobile: "9610465261",
    city: "Indore",
    source: "Dice",
    state: "Madhyapradesh",
    status: "New Lead",
    title: "Full stack developer",
    ownership: "-",
    authorization: "-",
  },
];

const ApplicantTable = () => {
  const [search, setSearch] = useState();
  const [page, setPage] = useState(0);
  const [dataCount, setDataCount] = useState();
  // const [applicantData, setApplicantData] = useState([]);

  return (
    <div>
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
        <div className="table_div">
          <table className="default-table ">
            <thead className="position-sticky">
              <tr>
                <th>
                  <input type="checkbox" />
                </th>
                <th className="w-10">Applicant ID</th>
                <th>Applicant Name</th>
                <th>Email Address</th>
                <th>Mobile Number</th>
                <th>City</th>
                <th>Source</th>
                <th>State</th>
                <th>Applicant Status</th>
                <th>Job Title</th>
                <th>Ownership</th>
                <th className="">Work Authorization</th>
              </tr>
            </thead>
            <tbody>
              {applicantData.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>
                      <input type="checkbox" />
                    </td>
                    <td className="w-10">{item.id}</td>
                    <td className="">{item.name}</td>
                    <td className="">{item.email}</td>
                    <td className="">{item.mobile}</td>
                    <td className="">{item.city}</td>
                    <td className="">{item.source}</td>
                    <td className="">{item.state}</td>
                    <td className="">{item.status}</td>
                    <td className="">{item.title}</td>
                    <td className="c">{item.ownership}</td>
                    <td className="text-center">
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
