import Loader from "@/components/common/Loader";
import dynamic from "next/dynamic";

const AllApplicants = dynamic(() => import("@/components/dashboard-pages/employers-dashboard/all-applicants"), {
  ssr: false, // Disable SSR if AllApplicants depends on browser-specific features
  loading: () => <Loader />, // Optional loading state
});

export const metadata = {
  title: "All Applicants || KatalixAI - Job Board React NextJS Template",
  description: "KatalixAI - Job Board React NextJS Template",
};

const IndexPage = () => {
  return (
    <>
      <AllApplicants />
    </>
  );
};

export default IndexPage;
