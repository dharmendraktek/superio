import InnerLayout from "@/components/common/InnerLayout/InnerLayout";
import ClientSubmissionReport from "./components/ClientSubmissionReport";

const index = () => {
  return (
    <InnerLayout>
      <section className="user-dashboard">
        <div className="dashboard-outer">
          <div className="col-lg-12 px-3 mt-4">
            <ClientSubmissionReport />
          </div>
        </div>
      </section>
    </InnerLayout>
  );
};

export default index;
