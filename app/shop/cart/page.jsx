import dynamic from "next/dynamic";
import Cart from "@/components/shop/cart";

export const metadata = {
  title: "Cart || KatalixAI - Job Board React NextJS Template",
  description: "KatalixAI - Job Board React NextJS Template",
};

const index = () => {
  return (
    <>
      <Cart />
    </>
  );
};

export default dynamic(() => Promise.resolve(index), { ssr: false });
