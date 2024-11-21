import dynamic from "next/dynamic";
import ShopList from "@/components/shop/shop-list";

export const metadata = {
  title: "Shop List || KatalixAI - Job Board React NextJS Template",
  description: "KatalixAI - Job Board React NextJS Template",
};

const index = () => {
  return (
    <>
      <ShopList />
    </>
  );
};

export default dynamic(() => Promise.resolve(index), { ssr: false });
