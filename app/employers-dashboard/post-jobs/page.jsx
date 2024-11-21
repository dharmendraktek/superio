import dynamic from "next/dynamic";
import PostJob from "@/components/dashboard-pages/employers-dashboard/post-jobs";

export const metadata = {
  title: "Post Jobs || KatalixAI - Job Board React NextJS Template",
  description: "KatalixAI - Job Board React NextJS Template",
};

const index = () => {
  return (
    <>
      <PostJob />
    </>
  );
};

export default dynamic(() => Promise.resolve(index), { ssr: false });
