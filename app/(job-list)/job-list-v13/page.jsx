import dynamic from "next/dynamic";
import JobList from "@/components/job-listing-pages/job-list-v13";

export const metadata = {
  title: "Job List V13 || KatalixAI - Job Board React NextJS Template",
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
