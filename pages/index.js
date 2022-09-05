import { useEffect, useState } from "react";

export default function Index(props) {
  // const [prixBitcoin, setPrixBitcoin] = useState("En chargement");
  // useEffect(() => {
  //   fetch("https://blockchain.info/ticker")
  //     .then((response) => response.json())
  //     .then((data) => setPrixBitcoin(data.USD.last));
  // }, []);

  return (
    <main>
      <h1>Bienvenue sur mon portfolio</h1>
      <p>{props.prixBitcoin}$</p>
    </main>
  );
}

export async function getStaticProps() {
  let bitcoinPrice;
  await fetch("https://blockchain.info/ticker")
    .then((response) => response.json())
    .then((data) => (bitcoinPrice = data.USD.last));

  return {
    props: {
      prixBitcoin: bitcoinPrice,
    },
  };
}
