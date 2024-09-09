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

// Optionally, fetch data if necessary
export async function getServerSideProps() {
  try {
    const res = await fetch("https://example.com/api/data"); // Replace with actual API
    const data = await res.json();

    // Handle if data is undefined or invalid
    if (!data || data.length === 0) {
      return {
        props: {
          items: [],  // Provide default value to avoid errors
        },
      };
    }

    return {
      props: {
        items: data, // Pass the fetched data as props
      },
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      props: {
        items: [], // Handle fetch errors by providing fallback data
      },
    };
  }
}

const Index = ({ items }) => {
  return (
    <>
      <DashboadHome items={items} /> {/* Pass data to DashboadHome if needed */}
    </>
  );
};

export default Index;
