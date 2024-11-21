import dynamic from "next/dynamic";
import JobList from "@/components/job-listing-pages/job-list-v2";

export const metadata = {
  title: "Job List V2 || KatalixAI - Job Board React NextJS Template",
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
