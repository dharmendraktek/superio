import dynamic from "next/dynamic";
import ResumeAlerts from "@/components/dashboard-pages/employers-dashboard/resume-alerts";

export const metadata = {
  title: "Resume Alerts || KatalixAI - Job Board React NextJS Template",
  description: "KatalixAI - Job Board React NextJS Template",
};

const index = () => {
  return (
    <>
      <ResumeAlerts />
    </>
  );
};

export default dynamic(() => Promise.resolve(index), { ssr: false });
