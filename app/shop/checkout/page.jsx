import dynamic from "next/dynamic";
import Checkout from "@/components/shop/checkout";

export const metadata = {
  title: "Checkout || KatalixAI - Job Board React NextJS Template",
  description: "KatalixAI - Job Board React NextJS Template",
};

const index = () => {
  return (
    <>
      <Checkout />
    </>
  );
};

export default dynamic(() => Promise.resolve(index), { ssr: false });
