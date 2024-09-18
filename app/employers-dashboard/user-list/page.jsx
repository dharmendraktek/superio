import Loader from "@/components/common/Loader";
import dynamic from "next/dynamic";

const UserList = dynamic(() => import("@/components/dashboard-pages/employers-dashboard/userlist"), {
  ssr: false, // Disable SSR if UserList depends on browser-specific features
  loading: () => <Loader />, // Optional loading state to improve UX
});

export const metadata = {
  title: "Candidates Dashboard || Superio - Job Board React NextJS Template",
  description: "Superio - Job Board React NextJS Template",
};

const IndexPage = () => {
  return (
    <>
      <UserList />
    </>
  );
};

export default IndexPage;

