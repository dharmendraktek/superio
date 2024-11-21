import dynamic from "next/dynamic";
import JobList from "@/components/job-listing-pages/job-list-v6";

export const metadata = {
  title: "Job List V6 || KatalixAI - Job Board React NextJS Template",
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
