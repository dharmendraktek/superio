import dynamic from "next/dynamic";
import OrderCompleted from "@/components/shop/order-completed";

export const metadata = {
  title: "Order Completed || KatalixAI - Job Board React NextJS Template",
  description: "KatalixAI - Job Board React NextJS Template",
};

const index = () => {
  return (
    <>
      <OrderCompleted />
    </>
  );
};

export default dynamic(() => Promise.resolve(index), { ssr: false });
