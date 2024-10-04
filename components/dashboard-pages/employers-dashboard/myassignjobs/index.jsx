import InnerLayout from "@/components/common/InnerLayout/InnerLayout";
import AssignJobList from "./components/AssignJobList";

const index = () => {
  return (
    <InnerLayout>
      <section className="user-dashboard">
        <div className="dashboard-outer">
          <div className="col-12 px-4 mt-3">
             <div className="mt-5 text-center">
                 <strong>Work In progress</strong>
             </div>
              {/* <AssignJobList /> */}
          </div>
        </div>
      </section>
    </InnerLayout>
  );
};

export default index;
