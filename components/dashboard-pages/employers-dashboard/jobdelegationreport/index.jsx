import InnerLayout from "@/components/common/InnerLayout/InnerLayout";
import JobDelegationReport from "./components/JobDelegationReport";

const index = () => {
  return (
    <InnerLayout>
      <section className="user-dashboard">
        <div className="dashboard-outer">
          <div className="col-lg-12 px-4 mt-4">
          {/* <div className="mt-5 text-center">
                 <strong>Work In progress</strong>
             </div> */}
              <JobDelegationReport />
          </div>
        </div>
      </section>
    </InnerLayout>
  );
};

export default index;
