import dynamic from "next/dynamic";
import CvManager from "@/components/dashboard-pages/candidates-dashboard/cv-manager";

export const metadata = {
  title: "CV Manager || KatalixAI - Job Board React NextJS Template",
  description: "KatalixAI - Job Board React NextJS Template",
};

const index = () => {
  return (
    <>
      <CvManager />
    </>
  );
};

export default dynamic(() => Promise.resolve(index), { ssr: false });
