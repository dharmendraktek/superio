
import Loader from "@/components/common/Loader";
import dynamic from "next/dynamic";

const LeaveManagement = dynamic(() => import("@/components/dashboard-pages/employers-dashboard/leave-management/index"), {
  ssr: false, // Disable SSR if JobPosts relies on browser-specific features
  loading: () => <Loader />, // Optional loading state
});

export const metadata = {
  title: "Employers Dashboard || KatalixAI - Leave Management",
  description: "KatalixAI - Leave Management",
};

const IndexPage = () => {
  return (
    <>
      {/* <Breadcrumb /> */}
      <LeaveManagement />
    </>
  );
};

export default IndexPage;
