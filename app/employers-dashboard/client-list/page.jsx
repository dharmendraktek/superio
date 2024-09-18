// import dynamic from "next/dynamic";
// import ClientList from "@/components/dashboard-pages/employers-dashboard/clientlist";

// export const metadata = {
//   title: "Candidates Dashboard || Superio - Job Borad React NextJS Template",
//   description: "Superio - Job Borad React NextJS Template",
// };

// const index = () => {
//   return (
//     <>
//       <ClientList />
//     </>
//   );
// };

// export default dynamic(() => Promise.resolve(index), { ssr: false });


import Loader from "@/components/common/Loader";
import dynamic from "next/dynamic";

const ClientList = dynamic(() => import("@/components/dashboard-pages/employers-dashboard/clientlist"), {
  ssr: false, // Disable SSR for ClientList if it relies on the browser environment
  loading: () => <Loader />, // Optional loading state
});

export const metadata = {
  title: "Candidates Dashboard || Superio - Job Board React NextJS Template",
  description: "Superio - Job Board React NextJS Template",
};

const IndexPage = () => {
  return (
    <>
      <ClientList />
    </>
  );
};

export default IndexPage;
