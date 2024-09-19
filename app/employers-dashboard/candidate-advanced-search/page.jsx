import dynamic from "next/dynamic";

export const metadata = {
  title: "Candidates Dashboard || KatalixAI - Job Borad React NextJS Template",
  description: "KatalixAI - Job Borad React NextJS Template",
};



const index = () => {
  return (
    <>
    <div>
        This is the advanced search page
    </div>
    </>
  );
};

export default dynamic(() => Promise.resolve(index), { ssr: false });