import Loader from "@/components/common/Loader";
import dynamic from "next/dynamic";

const ClientSubmissionReport = dynamic(() => import("@/components/dashboard-pages/employers-dashboard/clientsubmissionreport/index"), {
  ssr: false, // Disable SSR if AllApplicants depends on browser-specific features
  loading: () => <Loader />, // Optional loading state
});

export const metadata = {
  title: "Client Submission Report || KatalixAI - Job Board React NextJS Template",
  description: "KatalixAI - Job Board React NextJS Template",
};

const IndexPage = () => {
  return (
    <>
      <ClientSubmissionReport />
    </>
  );
};

export default IndexPage;
