import Loader from "@/components/common/Loader";
import dynamic from "next/dynamic";

const ContactManagerApproval = dynamic(() => import("@/components/dashboard-pages/employers-dashboard/contactmanagerapproval/index"), {
  ssr: false, // Disable SSR if AllApplicants depends on browser-specific features
  loading: () => <Loader />, // Optional loading state
});

export const metadata = {
  title: "Approve Contact Manager || KatalixAI - Job Board React NextJS Template",
  description: "KatalixAI - Job Board React NextJS Template",
};

const IndexPage = () => {
  return (
    <>
      <ContactManagerApproval />
    </>
  );
};

export default IndexPage;
