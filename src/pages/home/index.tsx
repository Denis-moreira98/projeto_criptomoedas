import styles from "./home.module.css";
import { useEffect, useState, FormEvent } from "react";

import { BiSearch } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import { Loading } from "../../components/loading";

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
   numberDelta?: number;
}

interface DataProps {
   coins: CoinProps[];
}

export function Home() {
   const [coins, setCoins] = useState<CoinProps[]>([]);
   const [inputValue, setInputValue] = useState("");
   const [loading, setLoading] = useState(true);
   const navigate = useNavigate();

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
                     formatedMarket: price.format(Number(item.market_cap)),
                     numberDelta: parseFloat(item.delta_24h.replace(",", ".")),
                  };

                  return formated;
               });
               //console.log(formartResult);
               setCoins(formartResult);
               setLoading(false);
            });
      }
      getData();
   }, []);

   if (loading) {
      return (
         <div className={styles.container_loading}>
            <h2 className={styles.center}>Carregando informações...</h2>
            <Loading />
         </div>
      );
   }

   function handleSearch(event: FormEvent) {
      event.preventDefault();
      if (inputValue === "") return;

      navigate(`/detail/${inputValue}`);
   }

   return (
      <main className={styles.container}>
         <form className={styles.form} onSubmit={handleSearch}>
            <input
               placeholder="Digite o simbolo da moeda: BTC.."
               value={inputValue}
               onChange={(e) => setInputValue(e.target.value)}
            />
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
               {coins.map((coin) => (
                  <tr key={coin.name} className={styles.tr}>
                     <td className={styles.tdLabel} data-label="Moeda">
                        <Link
                           className={styles.link}
                           to={`/detail/${coin.symbol}`}
                        >
                           <span>{coin.name}</span> | {coin.symbol}
                        </Link>
                     </td>
                     <td className={styles.tdLabel} data-label="Mercado">
                        {coin.formatedMarket}
                     </td>
                     <td className={styles.tdLabel} data-label="Preço">
                        {coin.formatedPrice}
                     </td>
                     <td
                        className={
                           coin.numberDelta && coin.numberDelta >= 0
                              ? styles.tdProfit
                              : styles.tdLoss
                        }
                        data-label="Volume"
                     >
                        <span>{coin.delta_24h}</span>
                     </td>
                  </tr>
               ))}
            </tbody>
         </table>
      </main>
   );
}
