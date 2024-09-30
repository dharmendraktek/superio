
import Loader from "@/components/common/Loader";
import dynamic from "next/dynamic";

const UsersAttendance = dynamic(() => import("@/components/dashboard-pages/employers-dashboard/allusersattendance/index"), {
  ssr: false, // Disable SSR if JobPosts relies on browser-specific features
  loading: () => <Loader />, // Optional loading state
});

export const metadata = {
  title: "Employers Dashboard || KatalixAI - All Users Attendance",
  description: "KatalixAI - All Users Attendance",
};

const IndexPage = () => {
  return (
    <>
      {/* <Breadcrumb /> */}
      <UsersAttendance />
    </>
  );
};

export default IndexPage;
