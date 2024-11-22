'use client'

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import candidatesMenuData from "../../data/candidatesMenuData";
import HeaderNavContent from "./HeaderNavContent";
import { isActiveLink } from "../../utils/linkActiveChecker";

import { usePathname } from "next/navigation";
import Cookies from "js-cookie";
import { getReq, postApiReq } from "@/utils/apiHandlers";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { employeeDetails } from "@/features/employer/employerSlice";
import employerMenuData from "@/data/employerMenuData";
import { accessRoles } from "@/utils/constant";


const DashboardCandidatesHeader = () => {
    const [navbar, setNavbar] = useState(false);
    const employeeInfo = useSelector((state) => state.employer.user);
    const dispatch = useDispatch();
   
  const getUserDetails = async() => {
    const response = await getReq(`/current-user/`);
    if(response.status){
     dispatch(employeeDetails(response.data))
    }
 }

 useEffect(() => {
    getUserDetails();
 }, [])

    const changeBackground = () => {
        if (window.scrollY >= 0) {
            setNavbar(true);
        } else {
            setNavbar(false);
        }
    };

    useEffect(() => {
        window.addEventListener("scroll", changeBackground);
    }, []);
   
    let token = Cookies.get('is_user_refresh')

    let data = {
        refresh:token
    }
  
    const  handleLogout = async() => {
       const response  = await postApiReq('/logout/', data);
       if(response.status){
           toast.success('Logout sucessfully')
           Cookies.remove('is_user_token');
           Cookies.remove('is_user_refresh');
           window.location.href = '/'
       }
    }

    const filteredMenuList = employerMenuData.filter((item) => {
        if (
          !(employeeInfo?.access_role_details?.access_id == accessRoles.ADMIN) &&
          (item.name === "All Users Attendance" || item.name === "Employees Helpdesk Tickets")
        ) {
          return false;
        }
        return true;
      });
  


    return (
        // <!-- Main Header-->
        <header
            className={`main-header header-shaddow   ${
                navbar ? "fixed-header " : "fixed-header"
            }`}
        >
            <div className="container-fluid">
                {/* <!-- Main box --> */}
                <div className="main-box">
                    {/* <!--Nav Outer --> */}
                    <div className="nav-outer">
                        <div className="logo-box">
                            <div className="logo">
                                <Link href="/">
                                    <Image
                                        alt="brand"
                                        src="/images/Ktek Logo_Final-10.png"
                                        width={60}
                                        height={4}
                                        priority
                                    />
                                </Link>
                            </div>
                        </div>
                        {/* End .logo-box */}
                        <HeaderNavContent />
                        {/* <!-- Main Menu End--> */}
                    </div>
                    {/* End .nav-outer */}

                    <div className="outer-box">
                        {/* <button className="menu-btn">
                            <span className="count">1</span>
                            <span className="icon la la-heart-o"></span>
                        </button> */}
                        {/* wishlisted menu */}

                        {/* <button className="menu-btn">
                            <span className="icon la la-bell"></span>
                        </button> */}
                        {/* End notification-icon */}

                        {/* <!-- Dashboard Option --> */}
                        <div className="dropdown dashboard-option">
                            <a
                                className="dropdown-toggle"
                                role="button"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                            >
                                {employeeInfo?.profile_photo ?
                                <img
                                    alt="avatar"
                                    className="thumb"
                                    src={employeeInfo?.profile_photo}
                                    // width={50}
                                    // height={50}
                                    style={{width:'50px', height:'50px'}}
                                />
                                :
                                <div className="d-flex justify-content-center align-items-center" style={{width:'50px', height:'50px', background:"gray", borderRadius:"50%"}}>
                                    <span className="text-capitalize fw-600 text-white">{(employeeInfo?.user?.first_name?.slice(0, 1) || '')+ " " + (employeeInfo?.user?.last_name?.slice(0,1) || '')}</span>
                                </div>
                                }
                                <div className="ms-2">
                                <h5 className="text-capitalize">{(employeeInfo?.user?.first_name || '')+ " " + (employeeInfo?.user?.last_name || '')}</h5>
                                <span className="text-black fw-normal">{employeeInfo?.role_name}</span>
                                </div>
                            </a>

                            <ul className="dropdown-menu">
                                {filteredMenuList.map((item) => (
                                    <li
                                        className={`${
                                            isActiveLink(
                                                item.routePath,
                                                usePathname()
                                            )
                                                ? "active"
                                                : ""
                                        } mb-1`}
                                        key={item.id}
                                        onClick={() =>{
                                            if(item.name == 'Logout'){
                                                handleLogout()
                                            }
                                        }
                                        }
                                    >
                                        <Link href={item.routePath}>
                                            <i
                                                className={`la ${item.icon}`}
                                            ></i>{" "}
                                            {item.name}
                                        </Link>
                                    </li>
                                ))}
                                
                            </ul>
                        </div>
                        {/* End dropdown */}
                    </div>
                    {/* End outer-box */}
                </div>
            </div>
        </header>
    );
};

export default DashboardCandidatesHeader;
