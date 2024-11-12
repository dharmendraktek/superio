import Loader from "@/components/common/Loader";
import dynamic from "next/dynamic";

const MOM = dynamic(() => import("@/components/dashboard-pages/employers-dashboard/mom/index"), {
  ssr: false, // Disable SSR if AllApplicants depends on browser-specific features
  loading: () => <Loader />, // Optional loading state
});

export const metadata = {
  title: "Meeting of Minutes || KatalixAI - Job Board React NextJS Template",
  description: "KatalixAI - Job Board React NextJS Template",
};

const IndexPage = () => {
  return (
    <>
      <MOM />
    </>
  );
};

export default IndexPage;
