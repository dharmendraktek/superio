
import ClientTable from "./components/components/ClientTable";
import InnerLayout from "@/components/common/InnerLayout/InnerLayout";

const Index = () => {
  return (
      <InnerLayout>
      <section className="user-dashboard">
        <div className="dashboard-outer">
          <div className="row">
            <div className="col-xl-12 col-lg-12 px-5">
              <ClientTable />
            </div>
          </div>
        </div>
      </section>
      </InnerLayout>
  );
};

export default Index;
