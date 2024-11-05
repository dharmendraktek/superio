import InnerLayout from "@/components/common/InnerLayout/InnerLayout";
import InterviewReportTable from "./components/InterviewReportsTable";

const index = () => {
  return (
    <InnerLayout>
      <section className="user-dashboard">
        <div className="dashboard-outer">
          <div className="col-lg-12 px-3 mt-2">
              <InterviewReportTable />
          </div>
        </div>
      </section>
    </InnerLayout>
  );
};

export default index;
