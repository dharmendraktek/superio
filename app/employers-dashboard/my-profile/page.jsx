
import Loader from "@/components/common/Loader";
import dynamic from "next/dynamic";

const MyProfile = dynamic(() => import("@/components/dashboard-pages/employers-dashboard/myprofile/index"), {
  ssr: false, // Disable SSR if JobPosts relies on browser-specific features
  loading: () => <Loader />, // Optional loading state
});

export const metadata = {
  title: "Employers Dashboard || KatalixAI - My Profile",
  description: "KatalixAI - My Profile",
};

const IndexPage = () => {
  return (
    <>
      {/* <Breadcrumb /> */}
      <MyProfile />
    </>
  );
};

export default IndexPage;
