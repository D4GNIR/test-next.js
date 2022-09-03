import Link from "next/link";

export default function filtresDeClients(props) {
  return (
    <div
      style={{
        display: "flex",
        gap: "10px",
      }}
    >
      <Link href={`/${props.client}`}>
        <a
          style={{
            backgroundColor: "#ee6c4d",
            padding: "5px 15px 5px 15px",
            color: "white",
            borderRadius: "8px",
            textDecoration: "none",
          }}
        >
          Tout
        </a>
      </Link>
      <Link href={`/${props.client}/2021`}>
        <a
          style={{
            backgroundColor: "#ee6c4d",
            padding: "5px 15px 5px 15px",
            color: "white",
            borderRadius: "8px",
            textDecoration: "none",
          }}
        >
          2021
        </a>
      </Link>
      <Link href={`/${props.client}/2022`}>
        <a
          style={{
            backgroundColor: "#ee6c4d",
            padding: "5px 15px 5px 15px",
            color: "white",
            borderRadius: "8px",
            textDecoration: "none",
          }}
        >
          2022
        </a>
      </Link>
      <Link href={`/${props.client}/2023`}>
        <a
          style={{
            backgroundColor: "#ee6c4d",
            padding: "5px 15px 5px 15px",
            color: "white",
            borderRadius: "8px",
            textDecoration: "none",
          }}
        >
          2023
        </a>
      </Link>
    </div>
  );
}
