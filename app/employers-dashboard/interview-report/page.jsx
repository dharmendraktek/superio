import Loader from "@/components/common/Loader";
import dynamic from "next/dynamic";

const InterviewReport = dynamic(() => import("@/components/dashboard-pages/employers-dashboard/interviewreport/index"), {
  ssr: false, // Disable SSR if AllApplicants depends on browser-specific features
  loading: () => <Loader />, // Optional loading state
});

export const metadata = {
  title: "Interview Report || KatalixAI - Job Board React NextJS Template",
  description: "KatalixAI - Job Board React NextJS Template",
};

const IndexPage = () => {
  return (
    <>
      <InterviewReport />
    </>
  );
};

export default IndexPage;
