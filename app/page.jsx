import Wrapper from "@/layout/Wrapper";
import Home from "@/components/home-1";

export const metadata = {
  title: "Home || KatalixAI - Job Board React NextJS Template",
  description: "KatalixAI - Job Board React NextJS Template",
};

export default function page() {
  return (
    <Wrapper>
      <Home />
    </Wrapper>
  );
}
