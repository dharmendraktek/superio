import dynamic from "next/dynamic";
import JobPosts from "@/components/dashboard-pages/candidates-dashboard/jobposts";

export const metadata = {
  title: "Candidates Dashboard || Superio - Job Borad React NextJS Template",
  description: "Superio - Job Borad React NextJS Template",
};

const index = () => {
  return (
    <>
      <JobPosts />
    </>
  );
};

export default dynamic(() => Promise.resolve(index), { ssr: false });
