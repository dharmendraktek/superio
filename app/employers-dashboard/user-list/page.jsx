import dynamic from "next/dynamic";
import UserList from "@/components/dashboard-pages/employers-dashboard/userlist";

export const metadata = {
  title: "Candidates Dashboard || Superio - Job Borad React NextJS Template",
  description: "Superio - Job Borad React NextJS Template",
};

const index = () => {
  return (
    <>
      <UserList />
    </>
  );
};

export default dynamic(() => Promise.resolve(index), { ssr: false });
