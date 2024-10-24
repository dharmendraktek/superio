// "use client";

// import Link from "next/link";
// import React, { useState } from "react";
// import { reactIcons } from "@/utils/icons";
// import Cookies from "js-cookie";
// import { usePathname } from "next/navigation";
// import { isActiveLink } from "@/utils/linkActiveChecker";
// import { useSelector } from "react-redux";
// import employerMenuData from "@/data/employerMenuData";

// const menuList = [
//   { name: "DASHBOARD", url: "/employers-dashboard/dashboard", id:'' },
//   { name: "USER", url: "/employers-dashboard/user-list", id:'' },
//   { name: "CLIENT", url: "/employers-dashboard/client-list", id:'' },
//   { name: "JOB POSTING", url: "/employers-dashboard/job-posts", id:'' },
//   { name: "APPLICANTS", url: "/employers-dashboard/all-applicants", id:'' },
//   { name: "MY ASSIGN JOBS", url: "/employers-dashboard/my-assign-jobs" },
//   // { name: "HR", url: "/employers-dashboard/hr" },
//   {
//     name: "REPORTS",
//     url: "",
//     id:"reportsDropdown",
//     options: [
//       {
//         name: "JOBS",
//         url: "/employers-dashboard/jobs-report",
//       },
//       {
//         name: "JOBS DELEGATION",
//         url: "/employers-dashboard/jobs-delegation-report",
//       },
//       {
//         name: "CLIENT SUBMISSION",
//         url: "/employers-dashboard/client-submission-report",
//       },
//       {
//         name: "INTERVIEW SUBMISSION",
//         url: "/employers-dashboard/manage-jobs",
//       },
//     ],
//   },
//   { name: "PENDING TASK", url: "/employers-dashboard/submissions-approval", id:"pendingTask", },
//   { name: reactIcons.horizontaldots, url: "", id:"moreOption", },

// ];

// const pendingTaskData = [
//   {
//     id: 1,
//     name: "Pending Submission",
//     icon: "la-home",
//     routePath: "/employers-dashboard/schedule-interview",
//     active: "active",
//   },
// ]

// const additionalMenuData = [
//   {
//     id: 1,
//     name: "Schedule Interview",
//     icon: "la-home",
//     routePath: "/employers-dashboard/schedule-interview",
//     active: "active",
//   },
//   {
//     id: 2,
//     name: "Schedule Calander",
//     icon: "la-user-tie",
//     routePath: "/employers-dashboard/schedule-calander",
//     active: "",
//   },
// ]

// const subMenuData = [
//   {
//     id: 1,
//     name: "Jobs",
//     icon: "la-home",
//     routePath: "/employers-dashboard/jobs-report",
//     active: "active",
//   },
//   {
//     id: 2,
//     name: "Jobs Delegation",
//     icon: "la-user-tie",
//     routePath: "/employers-dashboard/jobs-delegation-report",
//     active: "",
//   },
//   {
//     id: 3,
//     name: "Submission",
//     icon: "la-paper-plane",
//     routePath: "/employers-dashboard/client-submission-report",
//     active: "",
//   },
//   {
//     id: 4,
//     name: "Interview",
//     icon: "la-briefcase",
//     routePath: "/employers-dashboard/interview-report",
//     active: "",
//   },
//   {
//     id: 5,
//     name: "Confirmation & Joining",
//     icon: "la-briefcase",
//     routePath: "/employers-dashboard/confirmation-joining-report",
//     active: "",
//   },
//   // {
//   //   id: 6,
//   //   name: "Joining",
//   //   icon: "la-briefcase",
//   //   routePath: "/employers-dashboard/joining-report",
//   //   active: "",
//   // },
// ];

// const HeaderNavContent = () => {
//   const [openReport, setOpenReport] = useState(null); // Store the index of the open report
//   const token = Cookies.get("is_user_refresh");
//   const userDetails = useSelector((state) => state.employer.user);
//   const [open, setOpen] = useState(null);

//   const handleReportToggle = (index) => {
//     setOpenReport(openReport === index ? null : index); // Toggle the dropdown
//   };

//   const filteredMenuList = menuList.filter((item) => {
//     // Hide USER and CLIENT menu for specific departments
//     if (
//       (userDetails?.department_name === "Operation" || userDetails?.department_name === "Support" ) &&
//       (item.name === "USER" || item.name === "CLIENT" || item.name == 'HR')
//     ) {
//       return false;
//     } else if (
//       userDetails?.department_name === "Finance" &&
//       (item.name === "USER" || item.name === "CLIENT" || "HR")
//     ) {
//       return false;
//     } else if (
//       userDetails?.department_name === "HR" &&
//       (item.name === "CLIENT" ||
//         item.name === "JOB POSTING" ||
//         item.name === "APPLICANTS" || item.name == "MY ASSIGN JOBS" || item.name == "REPORTS")

//     ) {
//       return false;
//     }
//     return true;
//   });

//   return (
//     <>
//       {token && (
//         <nav className="nav main-menu" style={{ height: "80px" }}>
//           <ul className="navigation" id="navbar">
//             {filteredMenuList.map((item, index) => {
//               return (
//                 <li
//                   key={index}
//                   className={`${
//                     isActiveLink(item.url, usePathname()) ? "active" : ""
//                   } mb-1 position-relative d-flex align-items-center gap-3 ${
//                     item.name == "REPORTS" ? "dropdown-toggle" : ""
//                   }`}
//                   style={{ position: "relative !important" }}
//                   id={item.id}
//                   data-bs-toggle={`${item.name == "REPORTS" || typeof item.name == "object" ? "dropdown" : ""}`}
//                   onClick={() => setOpen(item.name)}
//                 >
//                   <Link href={item.url} passHref>
//                     <span
//                       style={{
//                         boxShadow: "0 2px 1px rgb(6 118 51 / 55%) !important",
//                       }}
//                       className={`${
//                         usePathname() === item.url
//                           ? "text-white fw-normal shadow px-2 py-2 bg-black rounded-1"
//                           : ""
//                       }`}
//                       aria-expanded={openReport === index ? "true" : "false"}
//                       onClick={(e) => {
//                         if (item.name === "REPORTS") {
//                           e.preventDefault();
//                           handleReportToggle(index); // Handle dropdown toggle
//                         }
//                       }}
//                     >
//                       {item.name}
//                     </span>
//                   </Link>
//                   <div className="position-absolute">
//                     <ul className="px-2 dropdown-menu" aria-labelledby="reportsDropdown">
//                       {subMenuData.map((_item) => (
//                         <li
//                           className={`${
//                             isActiveLink(_item.routePath, usePathname())
//                               ? "active"
//                               : ""
//                           } mb-1`}
//                           key={_item.id}
//                         >
//                           <Link href={_item.routePath}>{_item.name}</Link>
//                         </li>
//                       ))}
//                     </ul>
//                   </div>
//                   <div className="position-absolute">
//                     <ul className="px-2 dropdown-menu" aria-labelledby="moreOption">
//                       {additionalMenuData.map((_item) => (
//                         <li
//                           className={`${
//                             isActiveLink(_item.routePath, usePathname())
//                               ? "active"
//                               : ""
//                           } mb-1`}
//                           key={_item.id}
//                         >
//                           <Link href={_item.routePath}>{_item.name}</Link>
//                         </li>
//                       ))}
//                     </ul>
//                   </div>
//                 </li>
//               );
//             })}
//           </ul>
//         </nav>
//       )}
//     </>
//   );
// };

// export default HeaderNavContent;

"use client";

import Link from "next/link";
import React, { useState } from "react";
import { reactIcons } from "@/utils/icons";
import Cookies from "js-cookie";
import { usePathname } from "next/navigation";
import { isActiveLink } from "@/utils/linkActiveChecker";
import { useSelector } from "react-redux";

const menuList = [
  { name: "DASHBOARD", url: "/employers-dashboard/dashboard", id: "" },
  { name: "USER", url: "/employers-dashboard/user-list", id: "" },
  { name: "CLIENT", url: "/employers-dashboard/client-list", id: "" },
  { name: "JOB POSTING", url: "/employers-dashboard/job-posts", id: "" },
  { name: "APPLICANTS", url: "/employers-dashboard/all-applicants", id: "" },
  { name: "MY ASSIGN JOBS", url: "/employers-dashboard/my-assign-jobs" },
  {
    name: "REPORTS",
    url: "",
    id: "reportsDropdown",
    options: [
      { name: "JOBS", url: "/employers-dashboard/jobs-report" },
      {
        name: "JOBS DELEGATION",
        url: "/employers-dashboard/jobs-delegation-report",
      },
      {
        name: "SUBMISSION",
        url: "/employers-dashboard/client-submission-report",
      },
      { name: "INTERVIEW", url: "/employers-dashboard/interview-report" },
      {
        name: "CONFIRMATION & JOINING",
        url: "/employers-dashboard/confirmation-joining-report",
      },
    ],
  },
  {
    name: "PENDING TASK",
    url: "",
    id: "pendingTaskDropdown",
    options: [
      {
        name: "Submissions Approval",
        url: "/employers-dashboard/submissions-approval",
      },
      // {
      //   name: "Client Approval",
      //   url: "/employers-dashboard/client-approval",
      // },
      // {
      //   name: "Contact Manager Approval",
      //   url: "/employers-dashboard/contact-manager-approval",
      // },
    ],
  },
  { name: "MORE", url: "", id: "moreOption", options:[] },
];


const additionalMenuData = [
  {
    id: 1,
    name: "Scheduled Interview",
    icon: "la-home",
    routePath: "/employers-dashboard/manage-jobs",
    active: "active",
  },
  {
    id: 2,
    name: "Schedule Calendar",
    icon: "la-user-tie",
    routePath: "/employers-dashboard/calendar",
    active: "",
  },
];

const subMenuData = [
  {
    id: 1,
    name: "Jobs",
    icon: "la-home",
    routePath: "/employers-dashboard/jobs-report",
    active: "active",
  },
  {
    id: 2,
    name: "Jobs Delegation",
    icon: "la-user-tie",
    routePath: "/employers-dashboard/jobs-delegation-report",
    active: "",
  },
  {
    id: 3,
    name: "Submission",
    icon: "la-paper-plane",
    routePath: "/employers-dashboard/client-submission-report",
    active: "",
  },
  {
    id: 4,
    name: "Interview",
    icon: "la-briefcase",
    routePath: "/employers-dashboard/interview-report",
    active: "",
  },
  {
    id: 5,
    name: "Confirmation & Joining",
    icon: "la-briefcase",
    routePath: "/employers-dashboard/confirmation-joining-report",
    active: "",
  },
];

const HeaderNavContent = () => {
  const [openDropdown, setOpenDropdown] = useState(null); // Track which dropdown is open
  const token = Cookies.get("is_user_refresh");
  const userDetails = useSelector((state) => state.employer.user);

  const handleDropdownToggle = (menuId) => {
      setOpenDropdown(openDropdown === menuId ? null : menuId); // Toggle specific dropdown
  };

    const filteredMenuList = menuList.filter((item) => {
      if (
        (userDetails?.department_name === "Operation" ||
          userDetails?.department_name === "Support") &&
        (item.name === "USER" || item.name === "CLIENT" || item.name === "HR")
      ) {
        return false;
      } else if (
        userDetails?.department_name === "Finance" &&
        (item.name === "USER" || item.name === "CLIENT" || "HR")
      ) {
        return false;
      } else if (
        userDetails?.department_name === "HR" &&
        (item.name === "CLIENT" ||
          item.name === "JOB POSTING" ||
          item.name === "APPLICANTS" ||
          item.name === "MY ASSIGN JOBS" ||
          item.name === "REPORTS" || item.name === "PENDING TASK" )
      ) {
        return false;
      }
      return true;
    });

  return (
    <>
      {token && (
        <nav className="nav main-menu" style={{ height: "80px" }}>
          <ul className="navigation" id="navbar">
            {filteredMenuList.map((item, index) => (
              <li
                key={index}
                className={`nav-item  ${
                  isActiveLink(item.url, usePathname()) ? "active" : ""
                } ${item.options ? "dropdown" : ""}`}
                onClick={() => handleDropdownToggle(item.id)}
              >
                <Link href={item.url} passHref className={`${isActiveLink(item.url, usePathname()) ? "active bg-black text-white rounded-1" : ""}`}>
                  <span
                    className={`nav-link ${
                      isActiveLink(item.url, usePathname()) ? "active text-white fw-600" : "text-black fw-600"
                    }`}
                  >
                    {item.name}
                  </span>
                </Link>

                {/* Dropdown Menu for Reports */}
                {item.options && item.id == "reportsDropdown" && (
                  <ul
                    className={`dropdown-menu ${
                      openDropdown === item.id ? "show" : ""
                    }`}
                  >
                    {item.options.map((option, optIndex) => (
                      <li key={optIndex}>
                        <Link href={option.url}>
                          <span className="dropdown-item">{option.name}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}

                {item.options && item.id == "pendingTaskDropdown" && (
                  <ul
                    className={`dropdown-menu ${
                      openDropdown === item.id ? "show" : ""
                    }`}
                  >
                    {item.options.map((option, optIndex) => (
                      <li key={optIndex}>
                        <Link href={option.url}>
                          <span className="dropdown-item">{option.name}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}

                {/* Additional Menu (More Options) */}
                {item.id === "moreOption" && (
                  <ul
                    className={`dropdown-menu ${
                      openDropdown === item.id ? "show" : ""
                    }`}
                    style={{width:"100% !important"}}
                  >
                    {additionalMenuData.map((option) => (
                      <li key={option.id}>
                        <Link href={option.routePath}>
                          <span className="dropdown-item">{option.name}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </nav>
      )}
    </>
  );
};

export default HeaderNavContent;
