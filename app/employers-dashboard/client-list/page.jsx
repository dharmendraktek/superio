
import Loader from "@/components/common/Loader";
import dynamic from "next/dynamic";

const ClientList = dynamic(() => import("@/components/dashboard-pages/employers-dashboard/clientlist"), {
  ssr: false, // Disable SSR for ClientList if it relies on the browser environment
  loading: () => <Loader />, // Optional loading state
});

export const metadata = {
  title: "Employers Dashboard || KatalixAI - Client List",
  description: "KatalixAI - Client List",
};

const IndexPage = () => {
  return (
    <>
      <ClientList />
    </>
  );
};

export default IndexPage;
