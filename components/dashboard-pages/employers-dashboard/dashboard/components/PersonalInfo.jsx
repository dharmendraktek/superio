'use client'
import Paper from "@/components/common/Paper";
import TopCardBlock from "./TopCardBlock";
import { useEffect } from "react";


const cardContent = [
    {
      id: 1,
      icon: "fa-solid fa-user",
      countNumber: "1972",
      metaName: "Employee Code",
      uiClass: "ui-blue",
      value:'employee-detial'
    },
    {
      id: 2,
      icon: "fa-solid fa-wallet",
      countNumber: "-",
      metaName: "Leave Balance",
      uiClass: "ui-red",
      value:'leave-management'
    },
    {
      id: 3,
      icon: "fa-clipboard-user",
      countNumber: "-",
      metaName: "Your Attendance",
      uiClass: "ui-yellow",
      value:'attendance'
    },
    {
      id: 4,
      icon: "fa-solid fa-house-user",
      countNumber: "APPLY FOR WFH",
      metaName: "Apply for work from home",
      uiClass: "ui-blue",
      value:'work-from-home'
    },
    {
        id: 5,
        icon: "fa-solid fa-person-circle-question",
        countNumber: "HELPDESK TICKET",
        metaName: "Ticket System",
        uiClass: "ui-red",
        value:'helpdesk-ticket'
      },
      {
        id: 6,
        icon: "fa-solid fa-calendar-day",
        countNumber: "CALENDAR",
        metaName: "Holiday",
        uiClass: "ui-yellow",
        value:'holiday'
      },
  ];


const PersonalInfo  = ({menuItem, setMenuItem, userDetails}) => {
   useEffect(() => {
     cardContent[0]['countNumber'] = userDetails?.empcode;   
   }, [userDetails])

   
    return(
        <Paper>
            <div className="row">
             <div>
                <h4 className="pb-2">Personal Information</h4>
             </div>
             <TopCardBlock cardContent={cardContent} setMenuItem={setMenuItem} menuItem={menuItem} userDetails={userDetails} />
            </div>
        </Paper>
    )
}

export default PersonalInfo;