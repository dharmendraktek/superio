import dynamic from "next/dynamic";
import AddApplicant from "@/components/dashboard-pages/employers-dashboard/addapplicant";

export const metadata = {
  title: "Candidates Dashboard || Superio - Job Borad React NextJS Template",
  description: "Superio - Job Borad React NextJS Template",
};

const index = () => {
  return (
    <>
      <AddApplicant />
    </>
  );
};

export default dynamic(() => Promise.resolve(index), { ssr: false });
