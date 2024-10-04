import Loader from "@/components/common/Loader";
import dynamic from "next/dynamic";

const JobsDelegationReport = dynamic(() => import("@/components/dashboard-pages/employers-dashboard/jobdelegationreport/index"), {
  ssr: false, // Disable SSR if AllApplicants depends on browser-specific features
  loading: () => <Loader />, // Optional loading state
});

export const metadata = {
  title: "Jobs Delegation Report || KatalixAI - Job Board React NextJS Template",
  description: "KatalixAI - Job Board React NextJS Template",
};

const IndexPage = () => {
  return (
    <>
      <JobsDelegationReport />
    </>
  );
};

export default IndexPage;
