import styles from "./home.module.css";
import { useEffect, useState } from "react";

import { BiSearch } from "react-icons/bi";
import { Link } from "react-router-dom";

//https://sujeitoprogramador.com/api-cripto/?key=60d3226e55eae848

interface CoinProps {
   name: string;
   delta_24h: string;
   symbol: string;
   volume_24h: string;
   market_cap: string;
   price: string;
   formatedPrice: string;
   formatedMarket: string;
}

interface DataProps {
   coins: CoinProps[];
}

export function Home() {
   const [coins, setCoins] = useState<CoinProps[]>([]);

   useEffect(() => {
      function getData() {
         fetch(
            "https://sujeitoprogramador.com/api-cripto/?key=60d3226e55eae848"
         )
            .then((response) => response.json())
            .then((data: DataProps) => {
               // a resquisição deu tudo certo
               const coinsData = data.coins.slice(0, 15);

               const price = Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
               });

               const formartResult = coinsData.map((item) => {
                  const formated = {
                     ...item,
                     formatedPrice: price.format(Number(item.price)),
                     formatedmarket: price.format(Number(item.market_cap)),
                  };

                  return formated;
               });
               //console.log(formartResult);
               setCoins(formartResult);
            });
      }
      getData();
   }, []);

   return (
      <main className={styles.container}>
         <form className={styles.form}>
            <input placeholder="Digite o simbolo da moeda: BTC.." />
            <button type="submit">
               <BiSearch size={30} color="#FFF" />
            </button>
         </form>

         <table>
            <thead>
               <th scope="col">Moeda</th>
               <th scope="col">Valor mercado</th>
               <th scope="col">Preço</th>
               <th scope="col">Volume</th>
            </thead>

            <tbody id="tbody">
               <tr className={styles.tr}>
                  <td className={styles.td} data-label="Moeda">
                     <Link className={styles.link} to="/detail/btc">
                        <span>Bitcoin</span> | BTC
                     </Link>
                  </td>

                  <td className={styles.tdLabel} data-label="Valor de mercado">
                     R$ 409623
                  </td>

                  <td className={styles.tdLabel} data-label="Preço">
                     R$ 409623
                  </td>
                  <td className={styles.tdProfit} data-label="Volume">
                     <span>-5.3</span>
                  </td>
               </tr>
            </tbody>
         </table>
      </main>
   );
}
