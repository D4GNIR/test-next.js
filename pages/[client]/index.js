import { useRouter } from "next/router";
import CarteDeProjet from "../../components/CarteDeProjet/CarteDeProjet";
import FiltreDeClient from "../../components/FiltresDeClient/FiltresDeClient";

export default function projetsDuClient() {
  const router = useRouter();
  let nomDuClient = router.query.client;

  if (nomDuClient === "perso") {
    nomDuClient = "Projet personnels";
  } else {
    nomDuClient = `Projets de ${nomDuClient}`;
  }

  return (
    <>
      <h1>{nomDuClient}</h1>
      {/* Filtre */}
      <FiltreDeClient client={router.query.client} />
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3,1fr)",
          gap: "10px",
          marginTop: "15px",
        }}
      >
        <CarteDeProjet />
        <CarteDeProjet />
        <CarteDeProjet />
      </div>
    </>
  );
}
