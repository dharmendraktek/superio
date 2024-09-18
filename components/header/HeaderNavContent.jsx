"use client";

import Link from "next/link";

import React, { useEffect, useState } from "react";
import { reactIcons } from "@/utils/icons";
import Cookies from "js-cookie";

const menuList = [
  { name: "DASHBOARD", url: "/employers-dashboard/dashboard" },
  { name: "USER", url: "/employers-dashboard/user-list" },
  { name: "CLIENT", url: "/employers-dashboard/client-list" },
  { name: "JOB POSTING", url: "/employers-dashboard/job-posts" },
  { name: "APPLICANTS", url: "/employers-dashboard/all-applicants" },
  {
    name: "REPORTS",
    url: "/employers-dashboard/manage-jobs",
    option: [
      {
        name: "Interview Schedule Reports",
        url: "/employers-dashboard/manage-jobs",
      },
    ],
  },
];

const HeaderNavContent = () => {
  const [optionReport, setOpenReport] = useState(false);
  const [url, setUrl] = useState();

  let token = Cookies.get('is_user_refresh')
  

  return (
    <>
    {token &&
      <nav className="nav main-menu" style={{ height: "80px" }}>
        <ul className="navigation" id="navbar">
          {menuList.map((item, index) => {
            return (
              <React.Fragment key={index}>
                <li
                  key={index}
                  className="position-relative d-flex align-items-center  gap-3"
                  onClick={() => {
                    setUrl(item.url)
                    if (item.name == "REPORTS") {
                      setOpenReport(!optionReport);
                    }
                  }}
                >
                  <Link href={item.url}>
                    <span 
                    style={{boxShadow:"0 2px 1px rgb(6 118 51 / 55%) !important"}}
                    className={`${url == item.url? "  text-success shadow  px-2 py-2 rounded-1" : ''} `}
                    >{item.name}</span>
                    {item.name == "REPORTS" && (
                      <span className="fs-5">{reactIcons.arrowfilldown}</span>
                    )}
                  </Link>
                </li>
                {optionReport && (
                  <div
                    className="position-absolute bg-white border py-2  px-3 shadow"
                    style={{
                      top: "80px",
                      zIndex: 10000,
                      left: "650px",
                      width: "220px",
                    }}
                  >
                    <ul>
                      {item.option &&
                        item.option.map((_item, index) => {
                          return(
                          <Link href={_item.url}>
                            <li>{_item.name}</li>
                          </Link>
                          )
                        })}
                    </ul>
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </ul>
      </nav>
    }
    </>
  );
};

export default HeaderNavContent;
