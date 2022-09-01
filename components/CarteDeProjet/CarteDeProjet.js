import classes from "./carteDeProjet.module.css";
import { useRouter } from "next/router";

export default function CarteDeProjet() {
  const router = useRouter();

  //   Methode
  const cardClickHandler = () => {
    router.push({
      pathname: "/projets/[slug]",
      query: {
        slug: "Maze",
      },
    });
  };
  return (
    <div className={classes.CarteDeProjet} onClick={cardClickHandler}>
      <h3>Maze</h3>
      <p>Plateforme entertainement NFT sur Elrond</p>
    </div>
  );
}
