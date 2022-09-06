import { useForm } from "react-hook-form";
import Head from "next/head";

export default function Ajouter() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // method
  const formSubmit = (data) => {
    console.log(data);
  };

  return (
    <>
      <Head>
        <title>Ajouter un projet</title>
      </Head>
      <h1>Ajouter un projet</h1>
      <section style={{ display: "flex", justifyContent: "center" }}>
        <main style={{ backgroundColor: "#f3f3f3", padding: "30px" }}>
          {(errors.titre ||
            errors.slug ||
            errors.client ||
            errors.annee ||
            errors.description ||
            errors.contenu) && (
            <div
              style={{
                margin: "15px 0 15px 0",
                backgroundColor: "#ee6c4d",
                color: "white",
                padding: "10px",
                borderRadius: "5px",
              }}
            >
              Rempli tous les champs du formulaire
            </div>
          )}
          <form onSubmit={handleSubmit(formSubmit)}>
            <p>
              <label htmlFor='titre' style={{ display: "block" }}>
                Titre
              </label>
              <input
                id='titre'
                placeholder='Entre un titre'
                style={{
                  display: "block",
                  width: "400px",
                  border: "1px solid gray",
                  padding: "10px 15px 10px 15px",
                  borderRadius: "5px",
                  marginTop: "5px",
                }}
                {...register("titre", {
                  required: true,
                })}
              />
            </p>
            <p>
              <label htmlFor='slug' style={{ display: "block" }}>
                Slug
              </label>
              <input
                id='slug'
                placeholder='Entre un slug'
                style={{
                  display: "block",
                  width: "400px",
                  border: "1px solid gray",
                  padding: "10px 15px 10px 15px",
                  borderRadius: "5px",
                  marginTop: "5px",
                }}
                {...register("slug", {
                  required: true,
                })}
              />
            </p>
            <p>
              <label htmlFor='client' style={{ display: "block" }}>
                Client
              </label>
              <input
                id='client'
                placeholder='Entre un client'
                style={{
                  display: "block",
                  width: "400px",
                  border: "1px solid gray",
                  padding: "10px 15px 10px 15px",
                  borderRadius: "5px",
                  marginTop: "5px",
                }}
                {...register("client", {
                  required: true,
                })}
              />
            </p>
            <p>
              <label htmlFor='annee' style={{ display: "block" }}>
                Année
              </label>
              <input
                id='annee'
                placeholder='Entre une anneé'
                style={{
                  display: "block",
                  width: "400px",
                  border: "1px solid gray",
                  padding: "10px 15px 10px 15px",
                  borderRadius: "5px",
                  marginTop: "5px",
                }}
                {...register("annee", {
                  required: true,
                })}
              />
            </p>
            <p>
              <label
                htmlFor='description'
                style={{ display: "block" }}
              >
                Description
              </label>
              <textarea
                id='description'
                placeholder='Entre une description'
                rows='5'
                style={{
                  display: "block",
                  width: "400px",
                  border: "1px solid gray",
                  padding: "10px 15px 10px 15px",
                  borderRadius: "5px",
                  marginTop: "5px",
                  fontFamily: "Arial",
                }}
                {...register("description", {
                  required: true,
                })}
              ></textarea>
            </p>
            <p>
              <label htmlFor='contenu' style={{ display: "block" }}>
                Contenu
              </label>
              <textarea
                id='contenu'
                placeholder='Entre un contenu'
                rows='5'
                style={{
                  display: "block",
                  width: "400px",
                  border: "1px solid gray",
                  padding: "10px 15px 10px 15px",
                  borderRadius: "5px",
                  marginTop: "5px",
                  fontFamily: "Arial",
                }}
                {...register("contenu", {
                  required: true,
                })}
              ></textarea>
            </p>
            <div style={{ display: "flex", justifyContent: "end" }}>
              <button
                style={{
                  border: "0",
                  backgroundColor: "#ee6c4d",
                  color: "white",
                  padding: "10px 15px 10px 15px",
                  borderRadius: "5px",
                }}
              >
                Ajouter
              </button>
            </div>
          </form>
        </main>
      </section>
    </>
  );
}
