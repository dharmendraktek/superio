// import MobileMenu from "../../../header/MobileMenu";
// import DashboardCandidatesHeader from "../../../header/DashboardCandidatesHeader";
// import UserTable from "./components/UserTable";

// const Index = () => {
//   return (
//     <div className="page-wrapper theme-background">
//       <span className="header-span"></span>
//       <DashboardCandidatesHeader />
//       <MobileMenu />
//       <section className="user-dashboard">
//         <div className="dashboard-outer">
//           <div className="row">
//             <div className="col-xl-12 col-lg-12 px-5 ">
//               <UserTable />
//             </div>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default Index;

import dynamic from "next/dynamic";
import Loader from "@/components/common/Loader"; // Assuming you already have a loader component
import InnerLayout from "@/components/common/InnerLayout/InnerLayout";

const UserTable = dynamic(() => import("./components/UserTable"), {
  ssr: false,
  loading: () => <Loader />, // Show loader while loading
});

const Index = () => {
  return (
    <InnerLayout>
      <section className="user-dashboard">
        <div className="dashboard-outer">
          <div className="row">
            <div className="col-xl-12 col-lg-12 px-5">
              <UserTable />
            </div>
          </div>
        </div>
      </section>
    </InnerLayout>
  );
};

export default Index;
