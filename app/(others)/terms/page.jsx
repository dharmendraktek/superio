import dynamic from "next/dynamic";

import Terms from "@/components/pages-menu/terms";

export const metadata = {
  title: 'Terms || KatalixAI - Job Board React NextJS Template',
  description:
    'KatalixAI - Job Board React NextJS Template',
  
}



const index = () => {
  return (
    <>
      
      <Terms />
    </>
  );
};

export default dynamic(() => Promise.resolve(index), { ssr: false });
