"use client";

import Link from "next/link";
import React, { useState } from "react";
import { reactIcons } from "@/utils/icons";
import Cookies from "js-cookie";
import { usePathname } from "next/navigation";
import { isActiveLink } from "@/utils/linkActiveChecker";
import { useSelector } from "react-redux";
import employerMenuData from "@/data/employerMenuData";

const menuList = [
  { name: "DASHBOARD", url: "/employers-dashboard/dashboard" },
  { name: "USER", url: "/employers-dashboard/user-list" },
  { name: "CLIENT", url: "/employers-dashboard/client-list" },
  { name: "JOB POSTING", url: "/employers-dashboard/job-posts" },
  { name: "APPLICANTS", url: "/employers-dashboard/all-applicants" },
  { name: "MY ASSIGN JOBS", url: "/employers-dashboard/my-assign-jobs" },
  {
    name: "REPORTS",
    url: "",
    options: [
      {
        name: "JOBS",
        url: "/employers-dashboard/jobs-report",
      },
      {
        name: "JOBS DELEGATION",
        url: "/employers-dashboard/jobs-delegation-report",
      },
      {
        name: "CLIENT SUBMISSION",
        url: "/employers-dashboard/client-submission-report",
      },
      {
        name: "INTERVIEW SUBMISSION",
        url: "/employers-dashboard/manage-jobs",
      },
    ],
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
    name: "Client",
    icon: "la-paper-plane",
    routePath: "/employers-dashboard/client-submission-report",
    active: "",
  },
  {
    id: 4,
    name: "Interview",
    icon: "la-briefcase",
    routePath: "/employers-dashboard/manage-jobs",
    active: "",
  },
];

const HeaderNavContent = () => {
  const [openReport, setOpenReport] = useState(null); // Store the index of the open report
  const token = Cookies.get("is_user_refresh");
  const userDetails = useSelector((state) => state.employer.user);

  const handleReportToggle = (index) => {
    setOpenReport(openReport === index ? null : index); // Toggle the dropdown
  };

  const filteredMenuList = menuList.filter((item) => {
    // Hide USER and CLIENT menu for specific departments
    if (
      (userDetails?.department_name === "Operation" || userDetails?.department_name === "Support" ) &&
      (item.name === "USER" || item.name === "CLIENT")
    ) {
      return false;
    } else if (
      userDetails?.department_name === "Finance" &&
      (item.name === "USER" || item.name === "CLIENT")
    ) {
      return false;
    } else if (
      userDetails?.department_name === "HR" &&
      (item.name === "CLIENT" ||
        item.name === "JOB POSTING" ||
        item.name === "APPLICANTS")
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
            {filteredMenuList.map((item, index) => {
              return (
                <li
                  key={index}
                  className={`${
                    isActiveLink(item.url, usePathname()) ? "active" : ""
                  } mb-1 position-relative d-flex align-items-center gap-3 ${
                    item.name == "REPORTS" ? "dropdown-toggle" : ""
                  }`}
                  style={{ position: "relative !important" }}
                  data-bs-toggle={`${item.name == "REPORTS" ? "dropdown" : ""}`}
                >
                  <Link href={item.url} passHref>
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
                      onClick={(e) => {
                        if (item.name === "REPORTS") {
                          e.preventDefault();
                          handleReportToggle(index); // Handle dropdown toggle
                        }
                      }}
                    >
                      {item.name}
                    </span>
                  </Link>
                  <div className="position-absolute">
                    <ul className="dropdown-menu px-2">
                      {subMenuData.map((_item) => (
                        <li
                          className={`${
                            isActiveLink(_item.routePath, usePathname())
                              ? "active"
                              : ""
                          } mb-1`}
                          key={_item.id}
                        >
                          <Link href={_item.routePath}>{_item.name}</Link>
                        </li>
                      ))}
                    </ul>
                  </div>
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
