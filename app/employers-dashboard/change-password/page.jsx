import dynamic from "next/dynamic";
import ChangePassword from "@/components/dashboard-pages/employers-dashboard/change-password";

export const metadata = {
  title: "Change Password || KatalixAI - Job Board React NextJS Template",
  description: "KatalixAI - Job Board React NextJS Template",
};

const index = () => {
  return (
    <>
      <ChangePassword />
    </>
  );
};

export default dynamic(() => Promise.resolve(index), { ssr: false });
