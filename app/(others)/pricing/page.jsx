import dynamic from "next/dynamic";

import Pricing from "@/components/pages-menu/pricing";

export const metadata = {
  title: 'Pricing || KatalixAI - Job Board React NextJS Template',
  description:
    'KatalixAI - Job Board React NextJS Template',
  
}



const index = () => {
  return (
    <>
      
      <Pricing />
    </>
  );
};

export default dynamic(() => Promise.resolve(index), { ssr: false });
