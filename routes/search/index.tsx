import { FreshContext, PageProps } from "$fresh/server.ts";

type Data = {
  name?: string;
};


const Page = () => {
  return (
    <div>
      <form method="get" action="/people">
        <input type="text" name="name" />
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
};

export default Page;