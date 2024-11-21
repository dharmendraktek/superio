import dynamic from "next/dynamic";
import Packages from "@/components/dashboard-pages/employers-dashboard/packages";

export const metadata = {
  title: "Packages || KatalixAI - Job Board React NextJS Template",
  description: "KatalixAI - Job Board React NextJS Template",
};

const index = () => {
  return (
    <>
      <Packages />
    </>
  );
};

export default dynamic(() => Promise.resolve(index), { ssr: false });
