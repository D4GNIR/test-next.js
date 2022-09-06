import CarteDeProjet from "../../components/CarteDeProjet/CarteDeProjet";
import { connectToDatabase } from "../../helpers/mongodb";

export default function Projets(props) {
  return (
    <>
      <h1>Mes Projets</h1>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "10px",
        }}
      >
        {props.projets.map((projet) => (
          <CarteDeProjet projet={projet} key={projet._id} />
        ))}
      </div>
    </>
  );
}

export async function getStaticProps() {
  // Variables
  let projets;
  let client;

  try {
    const client = await connectToDatabase();
    const db = client.db();

    // Récupérer les projets
    projets = await db
      .collection("projets")
      .find()
      .sort({ DateDePublication: "desc" })
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
