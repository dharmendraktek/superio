"use client";

import Link from "next/link";
import React, { useState } from "react";
import { reactIcons } from "@/utils/icons";
import Cookies from "js-cookie";
import { usePathname } from "next/navigation";
import { isActiveLink } from "@/utils/linkActiveChecker";
import { useSelector } from "react-redux";

const menuList = [
  { name: "DASHBOARD", url: "/employers-dashboard/dashboard" },
  { name: "USER", url: "/employers-dashboard/user-list" },
  { name: "CLIENT", url: "/employers-dashboard/client-list" },
  { name: "JOB POSTING", url: "/employers-dashboard/job-posts" },
  { name: "APPLICANTS", url: "/employers-dashboard/all-applicants" },
  {
    name: "REPORTS",
    url: "/employers-dashboard/manage-jobs",
    options: [
      {
        name: "Interview Schedule Reports",
        url: "/employers-dashboard/manage-jobs",
      },
    ],
  },
];

const HeaderNavContent = () => {
  const [openReport, setOpenReport] = useState(null); // Store the index of the open report
  const token = Cookies.get("is_user_refresh");
  const userDetails = useSelector((state) => state.employer.user);

  const handleReportToggle = (index) => {
    setOpenReport(openReport === index ? null : index);
  };

  return (
    <>
      {token && (
        <nav className="nav main-menu" style={{ height: "80px" }}>
          <ul className="navigation" id="navbar">
            {menuList.map((item, index) => {
              return (
                <li
                  key={index}
                  className={`${
                    isActiveLink(item.url, usePathname()) ? "active" : ""
                  } mb-1 position-relative d-flex align-items-center gap-3 `}
                >
                  <Link href={item.url}>
                    <span
                      style={{
                        boxShadow: "0 2px 1px rgb(6 118 51 / 55%) !important",
                      }}
                      className={`${
                        usePathname() === item.url
                          ? "text-white fw-normal shadow px-2 py-2 bg-black rounded-1"
                          : ""
                      }`}
                      aria-expanded={openReport === index ? "true" : "false"}
                      onClick={
                        item.name === "REPORTS"
                          ? (e) => {
                              e.preventDefault();
                              handleReportToggle(index);
                            }
                          : undefined
                      }
                    >
                      {item.name}
                    </span>
                    {item.name === "REPORTS" && (
                      <span className="fs-5">{reactIcons.arrowfilldown}</span>
                    )}
                  </Link>
                  {openReport === index && item.options && (
                    <ul
                      className="position-absolute bg-white border py-2 px-3 shadow"
                      style={{
                        top: "80px",
                        zIndex: 10000,
                        left: "650px",
                        width: "220px",
                      }}
                    >
                      {item.options.map((_item, subIndex) => (
                        <li key={subIndex}>
                          <Link href={_item.url}>{_item.name}</Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>
      )}
    </>
  );
};

export default HeaderNavContent;
