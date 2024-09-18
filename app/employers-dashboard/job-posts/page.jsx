import Loader from "@/components/common/Loader";
import dynamic from "next/dynamic";

const JobPosts = dynamic(() => import("@/components/dashboard-pages/employers-dashboard/jobposts"), {
  ssr: false, // Disable SSR if JobPosts relies on browser-specific features
  loading: () => <Loader />, // Optional loading state
});

export const metadata = {
  title: "Candidates Dashboard || Superio - Job Board React NextJS Template",
  description: "Superio - Job Board React NextJS Template",
};

const IndexPage = () => {
  return (
    <>
      <JobPosts />
    </>
  );
};

export default IndexPage;
