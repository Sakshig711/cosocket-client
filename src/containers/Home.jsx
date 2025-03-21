import hero from "../assets/hero.svg";
import { Link } from "react-router-dom";
import Button from "../components/Button";
import ProductCard from "../components/ProductCard";
import price from "../assets/price.png";
import shipping from "../assets/shipping.png";
import manu from "../assets/manu.png";
import quoto from "../assets/quoto.png";
import Layout from "../components/Layout";
import { useGetRandomProductsMutation } from "../store/slices/productApiSlice";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const services = [
  {
    name: "Resonable Price",
    desc: "Get the best prices for high-quality products.",
    image: price,
  },
  {
    name: "Shipping",
    desc: "Reliable and fast shipping services.",
    image: shipping,
  },
  {
    name: "Finding MSME",
    desc: "Connect with verified MSME manufacturers.",
    image: manu,
  },
  {
    name: "Best Quotations",
    desc: "Receive the best quotations for your needs.",
    image: quoto,
  },
];

export default function Home() {
  const [getRandomProducts, { isLoading }] = useGetRandomProductsMutation();
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const { data } = await getRandomProducts(8).unwrap();
      console.log(data);
      setProducts(data);
    } catch (error) {
      toast.error(error?.data?.meassage);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <Layout>
      <div className="Home">
        {/* Hero Section */}
        <div className="hero-section mt-20 mb-5 py-5 px-5 md:px-8 grid md:grid-cols-2 gap-10">
          <div className="img-container w-full h-full">
            <img
              src={hero}
              className="w-full h-full object-cover select-none"
              alt="Hero Image"
            />
          </div>
          <div className="content flex flex-col justify-center md:items-start gap-5 text-gray-950">
            <h1 className="text-[27px] font-bold normal">
              Custom manufacturing made easy with cosocket
            </h1>
            <p className="text-md -mt-1 md:text-start text-justify">
              Discover seamless custom manufacturing solutions tailored to your
              unique product requirements. Simplify your manufacturing process
              with our user-friendly platform designed for your custom needs.
              Bridging Your Ideas to Custom Manufacturing Connect your concepts
              to manufacturing excellence with our advanced platform.
            </p>
            <div className="price uppercase text-sm font-bold w-fit py-1 border-b-2 border-gray-950">
              Subscription : $99 / Year
            </div>

            <Link to={"/demo"} className="">
              <Button className={"text-md"}>Live Demo</Button>
            </Link>
          </div>
        </div>

        {/* Products Section */}
        <div className="products-section mt-20 mb-5 px-5">
          <h1 className="heading" id="products">
            <span> Our Products </span>
          </h1>
          <div className="grid gap-8 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 place-items-center">
            {products &&
              products.map((element, index) => (
                <ProductCard
                        key={index}
                        imgUrl={element.image}
                        name={element.name}
                        slug={element.slug}
                        description={element.description}
                      />
              ))}
          </div>
        </div>

        {/* Services Section */}
        <div className="services-section mt-20 mb-5 px-5">
          <h1 className="heading" id="services">
            {" "}
            <span>Services</span>{" "}
          </h1>
          <div className="grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-6">
            {services.map((service, index) => (
              <div
                key={index}
                className="flex text-gray-950 py-5 px-4 flex-col justify-center items-center gap-3 text-gray-95"
              >
                <img
                  className="w-24 mx-auto"
                  src={service.image}
                  alt={service.name}
                />
                <h1 className="font-bold text-center text-xl mt-2">
                  {service.name}
                </h1>
                <p className="text-center">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
