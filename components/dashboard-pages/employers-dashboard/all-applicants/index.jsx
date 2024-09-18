import ApplicantTable from "./components/ApplicantTable";
import InnerLayout from "@/components/common/InnerLayout/InnerLayout";

const index = () => {
  return (
    <InnerLayout>
      <section className="user-dashboard">
        <div className="dashboard-outer">
          <div className="row">
            <div className="col-lg-12 px-5 mt-3">
              <ApplicantTable />
            </div>
          </div>
        </div>
      </section>
    </InnerLayout>
  );
};

export default index;
