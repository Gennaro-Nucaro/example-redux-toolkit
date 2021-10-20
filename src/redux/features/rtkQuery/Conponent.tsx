import * as React from "react";
import { useGetPokemonByNameQuery } from "./services/pokemon";

export default function Component() {
  const [value, setValue] = React.useState("");
  const [pokemon, setPokemon] = React.useState("bulbasaur");
  // Using a query hook automatically fetches data and returns query values
  const {
    data,
    error,
    isLoading,
    /*aggiunti da me non si trovano nell'esempio base, sono utility aggiuntive*/
    isError,
    isSuccess,
    isUninitialized,
  } = useGetPokemonByNameQuery(pokemon);
  // Individual hooks are also accessible under the generated endpoints:
  // const { data, error, isLoading } = pokemonApi.endpoints.getPokemonByName.useQuery('bulbasaur')

  console.groupCollapsed("normal check");
  console.log(data, "->data", error, "->error", isLoading, "isLoading");
  console.groupEnd();

  console.groupCollapsed("addiotion check");
  console.log(
    isError,
    "->isError",
    isSuccess,
    "->isSuccess",
    isUninitialized,
    "isUninitialized"
  );
  console.groupEnd();

  const cerca = () => {
    if (value !== "") setPokemon(value);
  };

  return (
    <div style={{ marginTop: 10, textAlign: "center" }}>
      <hr />
      <div>
        <h3>Cerca pokemon</h3>
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          type="text"
          placeholder="inserisci nome pokemon"
        />
        <button onClick={cerca} type="button">
          Cerca
        </button>
      </div>
      {error ? (
        <>Oh no, there was an error</>
      ) : isLoading ? (
        <>Loading...</>
      ) : data ? (
        <>
          <h3>{data.species.name}</h3>
          <img src={data.sprites.front_shiny} alt={data.species.name} />
        </>
      ) : null}
    </div>
  );
}
