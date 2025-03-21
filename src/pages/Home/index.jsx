import React from "react";
import Navbar from "../../components/Navbar";

const Home = () => {
  return (
    <>
      <Navbar />
      <div className="bg-[#FAFBFD] min-h-screen">
        <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 py-10">
          <h1 className="text-3xl mb-5">Selamat berbelanja</h1>
        </div>
      </div>
    </>
  );
};

export default Home;
