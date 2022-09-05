import CarteDeProjet from "../../components/CarteDeProjet/CarteDeProjet";
import { connectToDatabase } from "../../helpers/mongodb";

export default function Projets(props) {
  console.log(props);
  return (
    <>
      <h1>Mes Projets</h1>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3,1fr)",
          gap: "10px",
        }}
      >
        {props.projets.map((projet) => (
          <CarteDeProjet projet={projet} />
        ))}
      </div>
    </>
  );
}

export async function getStaticProps() {
  let projets;
  let client;

  try {
    // connexion à mongoDB
    const client = await connectToDatabase();
    // connexion à bdd
    const db = client.db();
    // Récuperer les projets
    projets = await db
      .collection("projets")
      .find()
      .toArray();
  } catch (error) {
    projets = [];
  }
  return {
    props: {
      projets: JSON.parse(JSON.stringify(projets)),
    },
  };
}
