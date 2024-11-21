import dynamic from "next/dynamic";

import Faq from "@/components/pages-menu/faq";

export const metadata = {
  title: 'Faq || KatalixAI - Job Board React NextJS Template',
  description:
    'KatalixAI - Job Board React NextJS Template',
  
}



const index = () => {
  return (
    <>
      
      <Faq />
    </>
  );
};

export default dynamic(() => Promise.resolve(index), { ssr: false });
