import dynamic from "next/dynamic";
import JobList from "@/components/job-listing-pages/job-list-v7";

export const metadata = {
  title: "Job List V7 || KatalixAI - Job Borad React NextJS Template",
  description: "KatalixAI - Job Borad React NextJS Template",
};

const index = () => {
  return (
    <>
      <JobList />
    </>
  );
};

export default dynamic(() => Promise.resolve(index), { ssr: false });
