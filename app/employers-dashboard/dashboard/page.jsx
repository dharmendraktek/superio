import Loader from "@/components/common/Loader";
import dynamic from "next/dynamic";

const DashboadHome = dynamic(() => import("@/components/dashboard-pages/employers-dashboard/dashboard"), {
  ssr: false, // Disable SSR if DashboadHome relies on browser-specific features
  loading: () => <Loader />, // Optional loading state for better UX
});

export const metadata = {
  title: "Employers Dashboard || Superio - Job Board React NextJS Template",
  description: "Superio - Job Board React NextJS Template",
};

const IndexPage = () => {
  return (
    <>
      <DashboadHome />
    </>
  );
};

export default IndexPage;
