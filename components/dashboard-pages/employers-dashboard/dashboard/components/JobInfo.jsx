import TopCardBlock from "@/components/dashboard-pages/candidates-dashboard/dashboard/components/TopCardBlock";

const { default: Paper } = require("@/components/common/Paper")

const cardContent = [
    {
      id: 1,
      icon: "flaticon-briefcase",
      countNumber: "22",
      metaName: "Employee Code",
      uiClass: "ui-blue",
    },
    {
      id: 2,
      icon: "la-file-invoice",
      countNumber: "9382",
      metaName: "Leave Balance",
      uiClass: "ui-red",
    },
    {
      id: 3,
      icon: "la-comment-o",
      countNumber: "74",
      metaName: "Your Attendance",
      uiClass: "ui-yellow",
    },
    {
      id: 4,
      icon: "la-bookmark-o",
      countNumber: "32",
      metaName: "Shortlist",
      uiClass: "ui-green",
    },
  ];


const JobInfo  = () => {
    return(
        <Paper>
            <div className="row">
             <div>
                <h4 className="pb-2">Job Information</h4>
             </div>
             <TopCardBlock cardContent={cardContent} />
            </div>
        </Paper>
    )
}

export default JobInfo;