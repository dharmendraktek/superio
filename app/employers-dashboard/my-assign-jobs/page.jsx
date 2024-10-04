import Loader from "@/components/common/Loader";
import dynamic from "next/dynamic";

const MyAssignJobs = dynamic(() => import("@/components/dashboard-pages/employers-dashboard/myassignjobs/index"), {
  ssr: false, // Disable SSR if AllApplicants depends on browser-specific features
  loading: () => <Loader />, // Optional loading state
});

export const metadata = {
  title: "My Assign Jobs || KatalixAI - Job Board React NextJS Template",
  description: "KatalixAI - Job Board React NextJS Template",
};

const IndexPage = () => {
  return (
    <>
      <MyAssignJobs />
    </>
  );
};

export default IndexPage;
