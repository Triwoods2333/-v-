"use client";
import Pie from "@/components/pie";
import Footer from "@/components/footer";
import Header from "@/components/header";
import Hero from "@/components/hero";
import Input from "@/components/input";
import Npms from "@/components/npms";
import Radar from "@/components/radar";
import { Npm } from "@/types/npm";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
  const [npms, setNpms] = useState<Npm[]>([]);

  const fetchNpms = async function () {
    const result = await fetch("/api/get-npms");
    const { data } = await result.json();
    if (data) {
      setNpms(data);
    }
  };
  useEffect(() => {
    fetchNpms();
  }, []);
  return (
    <div>
      <Header />
      <Hero />
      <Input setNpms={setNpms} />
      <Npms npms={npms} />
      <Radar />
      <Footer />
    </div>
  );
}
