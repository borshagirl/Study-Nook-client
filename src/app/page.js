import Banner from "@/components/home/Banner";
import Testimonials from "@/components/home/Testimonials";
import WhyChooseUs from "@/components/home/WhyChooseUs";

export default function Home() {
  return (
    <div>
        <Banner></Banner>

        <WhyChooseUs></WhyChooseUs>
        <Testimonials></Testimonials>
    </div>
  );
}
