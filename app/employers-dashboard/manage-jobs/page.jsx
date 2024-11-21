import dynamic from "next/dynamic";
import ManageJobs from "@/components/dashboard-pages/employers-dashboard/manage-jobs";

export const metadata = {
  title: "Manage Jobs || KatalixAI - Job Board React NextJS Template",
  description: "KatalixAI - Job Board React NextJS Template",
};

const index = () => {
  return (
    <>
      <ManageJobs />
    </>
  );
};

export default dynamic(() => Promise.resolve(index), { ssr: false });
