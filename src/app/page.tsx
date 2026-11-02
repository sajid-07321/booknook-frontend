import { Banner } from "@/components/home/Banner";
import { HowBorrowingWorks } from "@/components/home/HowBorrowingWorks";
import { NewArrivals } from "@/components/home/NewArrivals";
import { TopCategories } from "@/components/home/TopCategories";

export default function Home() {
  return (
    <>
      <Banner />
      <NewArrivals />
      <HowBorrowingWorks />
      <TopCategories />
    </>
  );
}
