import DashboardCandidatesHeader from "@/components/header/DashboardCandidatesHeader";
import MobileMenu from "@/components/header/MobileMenu";


const InnerLayout = ({children}) => {
    return(
       <>
         <div className="page-wrapper theme-background">
      <span className="header-span"></span>
      <DashboardCandidatesHeader />
      <MobileMenu />
      <div>
        {children}
      </div>
      </div>
       </>
    )
}

export default InnerLayout;