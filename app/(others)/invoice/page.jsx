import dynamic from "next/dynamic";

import Invoice from "@/components/pages-menu/invoice";

export const metadata = {
  title: 'Invoice || KatalixAI - Job Board React NextJS Template',
  description:
    'KatalixAI - Job Board React NextJS Template',
  
}



const index = () => {
  return (
    <>
      
      <Invoice />
    </>
  );
};

export default dynamic(() => Promise.resolve(index), { ssr: false });
