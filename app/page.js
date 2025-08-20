import Slider from "./_components/Slider";
import GlobalApi from "./_utils/GlobalApi";
import Image from 'next/image'
import Footer from "./_components/Footer";
import HomeClient from "./_components/HomeClient";

export default async function Home() {
  const catalogueStructure = await GlobalApi.getCatalogueStructure();
  const initialProducts = await GlobalApi.getProducts();

  const sliderList = [
    {
      id: 1,
      attributes: {
        image: {
          data: {
            attributes: {
              url: "/images/banner-fresh-groceries.png",
            },
          },
        },
      },
    },
    {
      id: 2,
      attributes: {
        image: {
          data: {
            attributes: {
              url: "/images/banner-organic-food.png",
            },
          },
        },
      },
    },
  ];

  return (
    <HomeClient 
      catalogueStructure={catalogueStructure} 
      initialProducts={initialProducts} 
      sliderList={sliderList} 
    />
  );
}
