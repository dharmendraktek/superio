import Paper from "@/components/common/Paper";
import TopCardBlock from "./TopCardBlock";


const cardContent = [
    {
      id: 1,
      icon: "fa-solid fa-user",
      countNumber: "1972",
      metaName: "Employee",
      uiClass: "ui-blue",
    },
    {
      id: 2,
      icon: "fa-solid fa-wallet",
      countNumber: "2.45",
      metaName: "Leave Management System",
      uiClass: "ui-red",
    },
    {
      id: 3,
      icon: "fa-clipboard-user",
      countNumber: "74",
      metaName: "Policy",
      uiClass: "ui-yellow",
    },
    {
      id: 4,
      icon: "fa-solid fa-house-user",
      countNumber: "APPLY FOR WFH",
      metaName: "WFH Management",
      uiClass: "ui-blue",
    },
    {
        id: 5,
        icon: "fa-solid fa-person-circle-question",
        countNumber: "Helpdesk Ticket",
        metaName: "Ticket Management System",
        uiClass: "ui-red",
      },
      {
        id: 6,
        icon: "fa-solid fa-calendar-day",
        countNumber: "Calender",
        metaName: "Holiday Management System",
        uiClass: "ui-yellow",
      },
  ];


const EmployeeInfo  = () => {
    return(
        <Paper>
            <div className="row">
             <div>
                <h4 className="pb-2">Employee Information</h4>
             </div>
             <TopCardBlock cardContent={cardContent} />
            </div>
        </Paper>
    )
}

export default EmployeeInfo;