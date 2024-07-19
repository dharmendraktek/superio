import dynamic from "next/dynamic";

export const metadata = {
  title: "Candidates Dashboard || Superio - Job Borad React NextJS Template",
  description: "Superio - Job Borad React NextJS Template",
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