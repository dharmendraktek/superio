import dynamic from "next/dynamic";
import MyProfile from "@/components/dashboard-pages/candidates-dashboard/my-profile";

export const metadata = {
  title: "My Profile || KatalixAI - Job Board React NextJS Template",
  description: "KatalixAI - Job Board React NextJS Template",
};

const index = () => {
  return (
    <>
      <MyProfile />
    </>
  );
};

export default dynamic(() => Promise.resolve(index), { ssr: false });
