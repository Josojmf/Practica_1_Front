import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";
import Axios from "npm:axios";
type Results= {
    results: Character[]
}
type Character = {
    name: string;
    height: string;
    mass: string;
    gender : string;
    birth_year : string;
  };
  

export const handler: Handlers = {
  async GET(_req: Request, ctx: FreshContext<unknown, Character>) {
        const url = new URL(_req.url);
        const name = url.searchParams.get("name") || undefined;
        
      const character = await Axios.get<Results>(
        `https://swapi.dev/api/people/?search=${name}`,
      );
      return ctx.render({
        name: character.data.results[0].name,
        height: character.data.results[0].height,
        mass: character.data.results[0].mass,
        gender: character.data.results[0].gender,
        birth_year: character.data.results[0].birth_year,
      });
  },
};

export default function Page(props: PageProps<Character>) {
  try {
    const character = props.data;
    return (
      <div>
        <h1>{character.name}</h1>
        <p>Name: {character.name}</p>
        <p>Height: {character.height}</p>
        <p>Mass: {character.mass}</p>
        <p>gender: {character.gender}</p>
        <p>birth year: {character.birth_year}</p>
      </div>
    );
  } catch (e) {
    return <div>Ha habido un error</div>;
  }
}