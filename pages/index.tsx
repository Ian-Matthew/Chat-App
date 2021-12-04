import type { NextPage } from "next";
import { Example } from "../src/example-feature/Example";
const Home: NextPage = () => {
  return (
    <section className="text-center">
      <h1 className="text-4xl mb-5 font-semibold">Example Page</h1>
      <Example></Example>
    </section>
  );
};

export default Home;
