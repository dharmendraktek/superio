import dynamic from "next/dynamic";
import Messages from "@/components/dashboard-pages/employers-dashboard/messages";

export const metadata = {
  title: "Messages || KatalixAI - Job Board React NextJS Template",
  description: "KatalixAI - Job Board React NextJS Template",
};

const index = () => {
  return (
    <>
      <Messages />
    </>
  );
};

export default dynamic(() => Promise.resolve(index), { ssr: false });
