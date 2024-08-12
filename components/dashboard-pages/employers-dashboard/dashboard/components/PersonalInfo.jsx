import TopCardBlock from "@/components/dashboard-pages/candidates-dashboard/dashboard/components/TopCardBlock";

const { default: Paper } = require("@/components/common/Paper")

const cardContent = [
    {
      id: 1,
      icon: "fa-solid fa-user",
      countNumber: "1972",
      metaName: "Employee Code",
      uiClass: "ui-blue",
    },
    {
      id: 2,
      icon: "fa-solid fa-wallet",
      countNumber: "2.45",
      metaName: "Leave Balance",
      uiClass: "ui-red",
    },
    {
      id: 3,
      icon: "fa-clipboard-user",
      countNumber: "74",
      metaName: "Your Attendance",
      uiClass: "ui-yellow",
    },
    {
      id: 4,
      icon: "fa-solid fa-house-user",
      countNumber: "Apply For WFH",
      metaName: "Apply for work from home",
      uiClass: "ui-blue",
    },
    {
        id: 5,
        icon: "fa-solid fa-person-circle-question",
        countNumber: "Helpdesk Ticket",
        metaName: "Ticket System",
        uiClass: "ui-red",
      },
      {
        id: 6,
        icon: "fa-solid fa-calendar-day",
        countNumber: "Calender",
        metaName: "Holiday",
        uiClass: "ui-yellow",
      },
  ];


const PersonalInfo  = () => {
    return(
        <Paper>
            <div className="row">
             <div>
                <h4 className="pb-2">Personal Information</h4>
             </div>
             <TopCardBlock cardContent={cardContent} />
            </div>
        </Paper>
    )
}

export default PersonalInfo;