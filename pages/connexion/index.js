import MyButton from "../../components/UI/Button/MyButton";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/client";
import { SpinnerDotted } from "spinners-react";
import { useState } from "react";
import { useRouter } from "next/router";
import Error from "../../components/UI/Error/Error";

export default function Connexion() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const router = useRouter();

  // UseState
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  //   Methode
  const onFormSubmit = async (data) => {
    setIsLoading(true);
    const resultat = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });
    setIsLoading(false);

    if (resultat.error) {
      setError(resultat.error);
    } else {
      router.replace("/");
    }
  };
  return (
    <>
      <h1 style={{ textAlign: "center", marginTop: "35px" }}>
        Connexion
      </h1>
      <section style={{ display: "flex", justifyContent: "center" }}>
        <main style={{ backgroundColor: "#f3f3f3", padding: "30px" }}>
          {error && <Error>{error}</Error>}
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
              <MyButton>
                {isLoading ? (
                  <SpinnerDotted
                    size={15}
                    thickness={100}
                    speed={100}
                    color='#ffffff'
                  />
                ) : (
                  "Je me connecte"
                )}
              </MyButton>
            </div>
          </form>
        </main>
      </section>
    </>
  );
}
