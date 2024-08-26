"use client";

import Link from "next/link";
import {
  blogItems,
  candidateItems,
  employerItems,
  findJobItems,
  homeItems,
  pageItems,
  shopItems,
  clientItems,
} from "../../data/mainMenuData";
import {
  isActiveParent,
  isActiveLink,
  isActiveParentChaild,
} from "../../utils/linkActiveChecker";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { getUserDetails } from "@/features/employer/employerAction";

const menuList = [
  { name: "DASHBOARD", url: "/employers-dashboard/dashboard" },
  { name: "USER", url: "/employers-dashboard/user-list" },
  { name: "CLIENT", url: "/employers-dashboard/client-list" },
  { name: "JOB POSTING", url: "/employers-dashboard/job-posts" },
  { name: "APPLICANTS", url: "/employers-dashboard/all-applicants" },
];

const HeaderNavContent = () => {
  // useEffect(() => {
  //       getUserDetails();
  // }, [])
  return (
    <>
      <nav className="nav main-menu" style={{ height: "80px" }}>
        <ul className="navigation" id="navbar">
          {menuList.map((item) => {
            return (
              <li>
                <Link href={item.url}>
                  <span>{item.name}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
};

export default HeaderNavContent;
