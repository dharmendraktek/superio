import dynamic from "next/dynamic";
import AddClient from "@/components/dashboard-pages/employers-dashboard/addclient";


export const metadata = {
  title: "Candidates Dashboard || Superio - Job Borad React NextJS Template",
  description: "Superio - Job Borad React NextJS Template",
};

const index = () => {
  return (
    <>
     <AddClient />
    </>
  );
};

export default dynamic(() => Promise.resolve(index), { ssr: false });