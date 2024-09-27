
import BreadCrumb from "../../BreadCrumb";
import Form from "./components/Form";
import MenuToggler from "../../MenuToggler";
import InnerLayout from "@/components/common/InnerLayout/InnerLayout";
import Paper from "@/components/common/Paper";

const index = () => {
  return (
     <InnerLayout>
      <section className="user-dashboard px-4 py-2">
      <Paper>
        <div className="dashboard-outer">
          <BreadCrumb title="Change Password!" />
          {/* breadCrumb */}

          <MenuToggler />
          {/* Collapsible sidebar button */}

          <div className="ls-widget">
            <div className="widget-title">
              <h4>Change Password</h4>
            </div>

            <div className="widget-content">
              <Form />
            </div>
          </div>
          {/* <!-- Ls widget --> */}
        </div>
        {/* End dashboard-outer */}
      </Paper>
      </section>
     </InnerLayout>
  );
};

export default index;
