import { Hero } from "@/components/home/Hero";
import { Promises, PromiseTicker } from "@/components/home/Promises";
import { Signatures } from "@/components/home/Signatures";
import { CravingPicker } from "@/components/home/CravingPicker";
import { BoardPeek } from "@/components/home/BoardPeek";
import { TheRoom } from "@/components/home/TheRoom";
import { Verdict } from "@/components/home/Verdict";
import { OrderFlow } from "@/components/home/OrderFlow";
import { VisitBlock } from "@/components/site/VisitBlock";

export default function HomePage() {
  return (
    <>
      <Hero />
      <PromiseTicker />
      <Signatures />
      <CravingPicker />
      <BoardPeek />
      <Promises />
      <TheRoom />
      <Verdict />
      <OrderFlow />
      <VisitBlock />
    </>
  );
}
