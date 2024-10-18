
import Loader from "@/components/common/Loader";
import dynamic from "next/dynamic";

const HelpdeskTickets = dynamic(() => import("@/components/dashboard-pages/employers-dashboard/employeeshelptickets/index"), {
  ssr: false, // Disable SSR if JobPosts relies on browser-specific features
  loading: () => <Loader />, // Optional loading state
});

export const metadata = {
  title: "Employees Helpdesk Ticket || KatalixAI - Helpdesk Ticket",
  description: "KatalixAI - Helpdesk Ticket",
};

const IndexPage = () => {
  return (
    <>
      {/* <Breadcrumb /> */}
      <HelpdeskTickets />
    </>
  );
};

export default IndexPage;
