
import Loader from "@/components/common/Loader";
import dynamic from "next/dynamic";

const WorkFromHome = dynamic(() => import("@/components/dashboard-pages/employers-dashboard/workfromhome/index"), {
  ssr: false, // Disable SSR if JobPosts relies on browser-specific features
  loading: () => <Loader />, // Optional loading state
});

export const metadata = {
  title: "Employers Dashboard || KatalixAI -Work From Home",
  description: "KatalixAI - Work From Home",
};

const IndexPage = () => {
  return (
    <>
      {/* <Breadcrumb /> */}
      <WorkFromHome  />
    </>
  );
};

export default IndexPage;