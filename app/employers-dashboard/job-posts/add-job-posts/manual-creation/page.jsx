import dynamic from "next/dynamic";
import ManualCreation from "@/components/dashboard-pages/employers-dashboard/manualcreation";


export const metadata = {
  title: "Candidates Dashboard || Superio - Job Borad React NextJS Template",
  description: "Superio - Job Borad React NextJS Template",
};

const index = () => {
  return (
    <>
      <ManualCreation />
    </>
  );
};

export default dynamic(() => Promise.resolve(index), { ssr: false });
