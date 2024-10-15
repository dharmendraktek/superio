import Loader from "@/components/common/Loader";
import dynamic from "next/dynamic";

const SubmissionsApproval = dynamic(() => import("@/components/dashboard-pages/employers-dashboard/submissionsapproval/index"), {
  ssr: false, // Disable SSR if AllApplicants depends on browser-specific features
  loading: () => <Loader />, // Optional loading state
});

export const metadata = {
  title: "Approve Submissions || KatalixAI - Job Board React NextJS Template",
  description: "KatalixAI - Job Board React NextJS Template",
};

const IndexPage = () => {
  return (
    <>
      <SubmissionsApproval />
    </>
  );
};

export default IndexPage;
