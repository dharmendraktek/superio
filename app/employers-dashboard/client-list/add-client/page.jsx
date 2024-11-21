import dynamic from "next/dynamic";
import AddClient from "@/components/dashboard-pages/employers-dashboard/addclient";


export const metadata = {
  title: "Candidates Dashboard || KatalixAI - Job Board React NextJS Template",
  description: "KatalixAI - Job Board React NextJS Template",
};

const index = () => {
  return (
    <>
     <AddClient />
    </>
  );
};

export default dynamic(() => Promise.resolve(index), { ssr: false });