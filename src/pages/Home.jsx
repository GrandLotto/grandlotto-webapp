import React from "react";
import HomeBanner from "../components/banner/HomeBanner";
import PlayCategory from "../components/home/PlayCategory";

import "../components/home/home.scss";

const Home = () => {
  return (
    <>
      <HomeBanner />
      <PlayCategory />
    </>
  );
};

export default Home;
