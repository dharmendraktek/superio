import dynamic from "next/dynamic";

import BlogList from "@/components/blog-meu-pages/blog-list-v1";

export const metadata = {
  title: "Blog List V1 || KatalixAI - Job Board React NextJS Template",
  description: "KatalixAI - Job Board React NextJS Template",
};
const index = () => {
  return (
    <>
      <BlogList />
    </>
  );
};

export default dynamic(() => Promise.resolve(index), { ssr: false });
