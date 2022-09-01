import { useRouter } from "next/router";

export default function projets() {
  const router = useRouter();

  //   Methode
  const titleClickHandler = () => {
    router.replace("/");
  };

  return <h1 onClick={titleClickHandler}>{router.query.slug}</h1>;
}
