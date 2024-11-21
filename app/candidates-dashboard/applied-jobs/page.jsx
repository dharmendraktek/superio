import dynamic from "next/dynamic";
import AppliedJobs from "@/components/dashboard-pages/candidates-dashboard/applied-jobs";

export const metadata = {
  title: "Applied Jobs || KatalixAI - Job Board React NextJS Template",
  description: "KatalixAI - Job Board React NextJS Template",
};

const index = () => {
  return (
    <>
      <AppliedJobs />
    </>
  );
};

export default dynamic(() => Promise.resolve(index), { ssr: false });
