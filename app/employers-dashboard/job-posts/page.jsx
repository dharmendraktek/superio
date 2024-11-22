import Breadcrumb from "@/components/common/Breadcrumb";
import Loader from "@/components/common/Loader";
import dynamic from "next/dynamic";

const JobPosts = dynamic(() => import("@/components/dashboard-pages/employers-dashboard/jobposts"), {
  ssr: false, // Disable SSR if JobPosts relies on browser-specific features
  loading: () => <Loader />, // Optional loading state
});

export const metadata = {
  title: "Employers Dashboard || KatalixAI - Job Posting",
  description: "KatalixAI - ATS",
};

const IndexPage = () => {
  return (
    <>
      {/* <Breadcrumb /> */}
      <JobPosts />
    </>
  );
};

export default IndexPage;
