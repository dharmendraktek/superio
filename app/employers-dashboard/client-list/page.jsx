import dynamic from "next/dynamic";
import ClientList from "@/components/dashboard-pages/employers-dashboard/clientlist";

export const metadata = {
  title: "Candidates Dashboard || Superio - Job Borad React NextJS Template",
  description: "Superio - Job Borad React NextJS Template",
};

const index = () => {
  return (
    <>
      <ClientList />
    </>
  );
};

export default dynamic(() => Promise.resolve(index), { ssr: false });
