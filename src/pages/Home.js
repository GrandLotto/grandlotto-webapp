import React, { useLayoutEffect } from "react";
import HomeBanner from "../components/banner/HomeBanner";
import PlayCategory from "../components/home/PlayCategory";
import { useLocation } from "react-router-dom";
import { bodyScrollTop } from "../global/customFunctions";

const Home = () => {
  let location = useLocation();

  useLayoutEffect(() => {
    bodyScrollTop();
  }, [location]);

  return (
    <>
      <HomeBanner />
      <PlayCategory />
    </>
  );
};

export default Home;
