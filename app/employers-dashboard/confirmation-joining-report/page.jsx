import Loader from "@/components/common/Loader";
import dynamic from "next/dynamic";

const ConfirmationReport = dynamic(() => import("@/components/dashboard-pages/employers-dashboard/confirmationreport/index"), {
  ssr: false, // Disable SSR if AllApplicants depends on browser-specific features
  loading: () => <Loader />, // Optional loading state
});

export const metadata = {
  title: "Confirmation Report || KatalixAI - Job Board React NextJS Template",
  description: "KatalixAI - Job Board React NextJS Template",
};

const IndexPage = () => {
  return (
    <>
      <ConfirmationReport />
    </>
  );
};

export default IndexPage;
