import Banner from "@/components/home/Banner";
import LatestRooms from "@/components/home/LatestRoom";
import Testimonials from "@/components/home/Testimonials";
import WhyChooseUs from "@/components/home/WhyChooseUs";

export default function Home() {
  return (
    <div>
        <Banner></Banner>
        <LatestRooms></LatestRooms>
        <WhyChooseUs></WhyChooseUs>
        <Testimonials></Testimonials>
    </div>
  );
}
