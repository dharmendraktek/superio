import dynamic from "next/dynamic";

import CandidatesList from "@/components/candidates-listing-pages/candidates-list-v5";

export const metadata = {
  title: 'Candidates List V5 || KatalixAI - Job Board React NextJS Template',
  description:
    'KatalixAI - Job Board React NextJS Template',
  
}



const index = () => {
  return (
    <>
      
      <CandidatesList />
    </>
  );
};

export default dynamic(() => Promise.resolve(index), { ssr: false });
