import dynamic from "next/dynamic";
import AddJob from "@/components/dashboard-pages/employers-dashboard/addjob";


export const metadata = {
  title: "Candidates Dashboard || Superio - Job Borad React NextJS Template",
  description: "Superio - Job Borad React NextJS Template",
};

const index = () => {
  return (
    <>
     <AddJob />
    </>
  );
};

export default dynamic(() => Promise.resolve(index), { ssr: false });