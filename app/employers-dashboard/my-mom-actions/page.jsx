import Loader from "@/components/common/Loader";
import dynamic from "next/dynamic";

const MyMomActions = dynamic(() => import("@/components/dashboard-pages/employers-dashboard/mymomactions/index"), {
  ssr: false, // Disable SSR if AllApplicants depends on browser-specific features
  loading: () => <Loader />, // Optional loading state
});

export const metadata = {
  title: "Meeting of Minutes Actions || KatalixAI - Job Board React NextJS Template",
  description: "KatalixAI - Job Board React NextJS Template",
};

const IndexPage = () => {
  return (
    <>
      <MyMomActions />
    </>
  );
};

export default IndexPage;
