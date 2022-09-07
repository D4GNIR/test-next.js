import MyButton from "../../components/UI/Button/MyButton";
import { useForm } from "react-hook-form";

export default function Connexion() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  //   Methode
  const onFormSubmit = (data) => {
    console.log(data);
  };
  return (
    <>
      <h1 style={{ textAlign: "center", marginTop: "35px" }}>
        Connexion
      </h1>
      <section style={{ display: "flex", justifyContent: "center" }}>
        <main style={{ backgroundColor: "#f3f3f3", padding: "30px" }}>
          <form onSubmit={handleSubmit(onFormSubmit)}>
            <p>
              <label htmlFor='email'>Addresse email</label>
              <input
                type='email'
                placeholder='email'
                {...register("email", {
                  required: true,
                  pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                })}
              />
              {errors.email && errors.email.type === "required" && (
                <small>Veuillez renseigner ce champ</small>
              )}
              {errors.email && errors.email.type === "pattern" && (
                <small>Votre adresse E-mail n'est pas correct</small>
              )}
            </p>
            <p>
              <label htmlFor='password'>Mot de passe</label>
              <input
                type='password'
                placeholder='Mot de passe'
                {...register("password", {
                  required: true,
                })}
              />
              {errors.password && (
                <small>Veuillez renseigner ce champ</small>
              )}
            </p>
            <div style={{ display: "flex", justifyContent: "end" }}>
              <MyButton>Je me connecte</MyButton>
            </div>
          </form>
        </main>
      </section>
    </>
  );
}
