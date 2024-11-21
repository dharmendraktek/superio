import dynamic from "next/dynamic";
import AddApplicant from "@/components/dashboard-pages/employers-dashboard/addapplicant";

export const metadata = {
  title: "Candidates Dashboard || KatalixAI - Job Board React NextJS Template",
  description: "KatalixAI - Job Board React NextJS Template",
};

const index = () => {
  return (
    <>
      <AddApplicant />
    </>
  );
};

export default dynamic(() => Promise.resolve(index), { ssr: false });
