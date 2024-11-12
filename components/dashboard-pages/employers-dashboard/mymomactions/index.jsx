import InnerLayout from "@/components/common/InnerLayout/InnerLayout";
import MomActionsTable from "./components/MomActionsTable";

const index = () => {
  return (
    <InnerLayout>
      <section className="user-dashboard">
        <div className="dashboard-outer">
          <div className="col-lg-12 px-3 mt-2">
          {/* <div className="mt-5 text-center">
                 <strong>Work In progress</strong>
             </div> */}
              <MomActionsTable />
          </div>
        </div>
      </section>
    </InnerLayout>
  );
};

export default index;
