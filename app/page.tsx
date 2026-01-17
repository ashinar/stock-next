import Link from "next/link";

export default function Home() {
  return (
    <>
      <Link href="/mags">Mags</Link>
      <br></br>
      <Link href="/cyclestrading">CyclesTrading</Link>
      <br></br>
      <Link href="/ta">Tel Aviv</Link>
      <br></br>
      <Link href="/GapReversal">Gap Reversal</Link>
    </>
  );
}
