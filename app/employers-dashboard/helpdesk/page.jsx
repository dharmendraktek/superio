
import Loader from "@/components/common/Loader";
import dynamic from "next/dynamic";

const HelpdeskTicket = dynamic(() => import("@/components/dashboard-pages/employers-dashboard/helpdesk/index"), {
  ssr: false, // Disable SSR if JobPosts relies on browser-specific features
  loading: () => <Loader />, // Optional loading state
});

export const metadata = {
  title: "Employers Dashboard || KatalixAI - Helpdesk Ticket",
  description: "KatalixAI - Helpdesk Ticket",
};

const IndexPage = () => {
  return (
    <>
      {/* <Breadcrumb /> */}
      <HelpdeskTicket />
    </>
  );
};

export default IndexPage;
