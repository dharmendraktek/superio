
import Loader from "@/components/common/Loader";
import dynamic from "next/dynamic";

const Attendance = dynamic(() => import("@/components/dashboard-pages/employers-dashboard/attendance/index"), {
  ssr: false, // Disable SSR if JobPosts relies on browser-specific features
  loading: () => <Loader />, // Optional loading state
});

export const metadata = {
  title: "Employers Dashboard || KatalixAI - Attendance",
  description: "KatalixAI - Attendance",
};

const IndexPage = () => {
  return (
    <>
      {/* <Breadcrumb /> */}
      <Attendance />
    </>
  );
};

export default IndexPage;
