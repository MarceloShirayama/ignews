import { GetStaticProps } from "next";
import Head from "next/head";
import Prismic from "@prismicio/client";
import { getPrismicClient } from "../../services/prismic";
import styles from "./styles.module.scss";

export default function Posts() {
  return (
    <>
      <Head>
        <title>Posts | Ignews</title>
      </Head>
      <main className={styles.container}>
        <div className={styles.posts}>
          <a href="#">
            <time>17 de janeiro de 2022</time>
            <strong>
              Obtendo o status de progresso do envio de dados com Axios
            </strong>
            <p>
              Vamos mostrar na prática como obter o progresso de cada requisição
              HTTP sendo feita através do método POST, do front end para o back
              end utilizando o Axios.
            </p>
          </a>
          <a href="#">
            <time>17 de janeiro de 2022</time>
            <strong>
              Obtendo o status de progresso do envio de dados com Axios
            </strong>
            <p>
              Vamos mostrar na prática como obter o progresso de cada requisição
              HTTP sendo feita através do método POST, do front end para o back
              end utilizando o Axios.
            </p>
          </a>
          <a href="#">
            <time>17 de janeiro de 2022</time>
            <strong>
              Obtendo o status de progresso do envio de dados com Axios
            </strong>
            <p>
              Vamos mostrar na prática como obter o progresso de cada requisição
              HTTP sendo feita através do método POST, do front end para o back
              end utilizando o Axios.
            </p>
          </a>
        </div>
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const prismic = getPrismicClient();

  const posts = await prismic.query(
    [Prismic.predicates.at("document.type", "pos")],
    {
      fetch: ["pos.title", "pos.content"],
      pageSize: 100,
    }
  );

  console.log(JSON.stringify(posts, null, 2));

  return {
    props: {},
  };
};
