// import dynamic from "next/dynamic";
// import DashboadHome from "@/components/dashboard-pages/candidates-dashboard/dashboard";

// export const metadata = {
//   title: "Candidates Dashboard || Superio - Job Borad React NextJS Template",
//   description: "Superio - Job Borad React NextJS Template",
// };

// const index = () => {
//   return (
//     <>
//       <DashboadHome />
//     </>
//   );
// };

// export default dynamic(() => Promise.resolve(index), { ssr: false });


import dynamic from "next/dynamic";

export const metadata = {
  title: "Candidates Dashboard || Superio - Job Board React NextJS Template",
  description: "Superio - Job Board React NextJS Template",
};

// Dynamically import DashboadHome with SSR disabled
const DashboadHome = dynamic(() => import("@/components/dashboard-pages/candidates-dashboard/dashboard"), {
  ssr: false,  // Disable SSR only for this component
});

const Index = () => {
  return (
    <>
      <DashboadHome />
    </>
  );
};

export default Index;
