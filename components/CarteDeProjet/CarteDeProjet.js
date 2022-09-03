import classes from "./carteDeProjet.module.css";
import { useRouter } from "next/router";
import Link from "next/link";

export default function CarteDeProjet() {
  const router = useRouter();
  const slug = "Maze";

  //   Methode
  // const cardClickHandler = () => {
  //   router.push({
  //     pathname: "/projets/[slug]",
  //     query: {
  //       slug: "Maze",
  //     },
  //   });
  // };

  return (
    <Link href={`/projets/${slug}`}>
      <a className={classes.CarteDeProjet}>
        <h3>Maze</h3>
        <p>Plateforme entertainement NFT sur Elrond</p>
      </a>
    </Link>
  );
}
