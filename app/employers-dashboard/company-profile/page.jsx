import dynamic from "next/dynamic";
import CompanyProfile from "@/components/dashboard-pages/employers-dashboard/company-profile";

export const metadata = {
  title: "Company Profile || KatalixAI - Job Board React NextJS Template",
  description: "KatalixAI - Job Board React NextJS Template",
};

const index = () => {
  return (
    <>
      <CompanyProfile />
    </>
  );
};

export default dynamic(() => Promise.resolve(index), { ssr: false });
