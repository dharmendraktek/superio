// import dynamic from "next/dynamic";
// import AddJob from "@/components/dashboard-pages/employers-dashboard/addjob";


// export const metadata = {
//   title: "Candidates Dashboard || Superio - Job Borad React NextJS Template",
//   description: "Superio - Job Borad React NextJS Template",
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
  title: "Candidates Dashboard || Superio - Job Board React NextJS Template",
  description: "Superio - Job Board React NextJS Template",
};

const Index = () => {
  return (
    <>
      <AddJob />
    </>
  );
};

export default Index;
