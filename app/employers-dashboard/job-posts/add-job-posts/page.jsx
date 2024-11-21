// import dynamic from "next/dynamic";
// import AddJob from "@/components/dashboard-pages/employers-dashboard/addjob";


// export const metadata = {
//   title: "Candidates Dashboard || KatalixAI - Job Board React NextJS Template",
//   description: "KatalixAI - Job Board React NextJS Template",
// };

// const index = () => {
//   return (
//     <>
//      <AddJob />
//     </>
//   );
// };

// export default dynamic(() => Promise.resolve(index), { ssr: false });


import dynamic from "next/dynamic";

// Dynamically import AddJob with SSR disabled
const AddJob = dynamic(() => import("@/components/dashboard-pages/employers-dashboard/addjob"), {
  ssr: false,
});

export const metadata = {
  title: "Candidates Dashboard || KatalixAI - Job Board React NextJS Template",
  description: "KatalixAI - Job Board React NextJS Template",
};

const Index = () => {
  return (
    <>
      <AddJob />
    </>
  );
};

export default Index;
