
import Loader from "@/components/common/Loader";
import dynamic from "next/dynamic";

const Calendar = dynamic(() => import("@/components/dashboard-pages/employers-dashboard/calendar/index"), {
  ssr: false, // Disable SSR if JobPosts relies on browser-specific features
  loading: () => <Loader />, // Optional loading state
});

export const metadata = {
  title: "Employers Dashboard || KatalixAI - Calendar",
  description: "KatalixAI - Calendar",
};

const IndexPage = () => {
  return (
    <>
      {/* <Breadcrumb /> */}
      <Calendar  />
    </>
  );
};

export default IndexPage;
