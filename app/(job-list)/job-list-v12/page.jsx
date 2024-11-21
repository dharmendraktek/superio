import dynamic from "next/dynamic";
import JobList from "@/components/job-listing-pages/job-list-v12";

export const metadata = {
  title: "Job List V12 || KatalixAI - Job Board React NextJS Template",
  description: "KatalixAI - Job Board React NextJS Template",
};

const index = () => {
  return (
    <>
      <JobList />
    </>
  );
};

export default dynamic(() => Promise.resolve(index), { ssr: false });
