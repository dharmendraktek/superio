import Loader from "@/components/common/Loader";
import dynamic from "next/dynamic";

const JoiningReport = dynamic(() => import("@/components/dashboard-pages/employers-dashboard/joiningreport/index"), {
  ssr: false, // Disable SSR if AllApplicants depends on browser-specific features
  loading: () => <Loader />, // Optional loading state
});

export const metadata = {
  title: "Joining Report || KatalixAI - Job Board React NextJS Template",
  description: "KatalixAI - Job Board React NextJS Template",
};

const IndexPage = () => {
  return (
    <>
      <JoiningReport />
    </>
  );
};

export default IndexPage;
