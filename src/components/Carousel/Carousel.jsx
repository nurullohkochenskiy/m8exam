import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useCrypto } from "../../context/ContextProvider";
import { useNavigate } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

const Carousel = () => {
  const navigate = useNavigate();
  const carouselRef = useRef(null);
  const { cryptos, currency } = useCrypto();
  const handleNavigate = (id) => {
    navigate(`/info/${id}`);
  };
  const currencyHandler = (amount) => {
    if (currency == "usd") {
      return `$ ${amount.toFixed(2)}`;
    } else if (currency == "eur") {
      return `€ ${(amount * 0.92).toFixed(2)}`;
    } else if (currency == "rub") {
      return `₽ ${(amount * 90.3).toFixed(2)}`;
    }
  };
  useEffect(() => {
    const carousel = carouselRef.current;
    const items = carousel.querySelectorAll(".carousel-item");
    const numItems = items.length;
    const itemWidth = items[0]?.offsetWidth || 0;
    const carouselWidth = numItems * itemWidth;

    gsap.set(carousel, { x: 0 });

    const loop = gsap.timeline({
      repeat: -1,
      ease: "linear",
      onComplete: resetCarousel,
    });
    loop.to(carousel, { x: -carouselWidth, duration: 90 });

    function resetCarousel() {
      gsap.set(carousel, { x: 0 });
    }

    items.forEach((item, index) => {
      gsap.to(item, {
        scrollTrigger: {
          trigger: item,
          start: "left center",
          end: "right center",
          scrub: true,
          invalidateOnRefresh: true,
        },
        opacity: 1,
      });
    });

    return () => {
      loop.kill();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [cryptos]);

  return (
    <div className="relative  overflow-hidden max-w-[1200px]">
      <div ref={carouselRef} className="flex h-full">
        {cryptos.map((crypto, index) => (
          <div
            key={index}
            className="carousel-item w-[25%] shrink-0 flex justify-center items-center"
          >
            <div onClick={() => handleNavigate(crypto.id)} className="wrapper">
              <img
                width={80}
                height={80}
                src={crypto.image}
                alt={`Item ${index + 1}`}
                className="max-w-full h-auto "
              />
              <div className="item__name">
                {crypto.symbol.toUpperCase()}{" "}
                {crypto.price_change_percentage_24h > 0 ? (
                  <span className="text__success">
                    {"+" + crypto.price_change_percentage_24h.toFixed(2) + "%"}
                  </span>
                ) : (
                  <span className="text__danger">
                    {crypto.price_change_percentage_24h.toFixed(2) + "%"}
                  </span>
                )}
              </div>
              <div className="price">
                {currencyHandler(crypto.current_price)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
