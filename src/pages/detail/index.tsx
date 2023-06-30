import { useEffect, useState } from "react";
import styles from "./detail.module.css";
import { useParams, useNavigate } from "react-router-dom";

interface CoinProp {
   symbol: string;
   name: string;
   price: string;
   market_cap: string;
   low_24h: string;
   high_24h: string;
   total_volume_24h: string;
   delta_24h: string;
   formated_price: string;
   formated_market: string;
   formatedLowprice: string;
   formatedHighprice: string;
   error?: string;
}

export function Detail() {
   const { cripto } = useParams();
   const [detail, setDetail] = useState<CoinProp>();
   const [loading, setLoading] = useState(true);

   const navigate = useNavigate();

   useEffect(() => {
      function getData() {
         fetch(
            `https://sujeitoprogramador.com/api-cripto/coin/?key=60d3226e55eae848&symbol=${cripto}`
         )
            .then((response) => response.json())
            .then((data: CoinProp) => {
               if (data.error) {
                  navigate("/");
               }

               const price = Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
               });
               const resultData = {
                  ...data,
                  formated_price: price.format(Number(data.price)),
                  formated_market: price.format(Number(data.market_cap)),
                  formatedLowprice: price.format(Number(data.low_24h)),
                  formatedHighprice: price.format(Number(data.high_24h)),
               };

               setDetail(resultData);
               setLoading(false);
               //console.log(resultData);
            });
      }
      getData();
   }, [cripto]);

   if (loading) {
      return (
         <div className={styles.container}>
            <h4 className={styles.center}>Carregando informações...</h4>
         </div>
      );
   }

   return (
      <div className={styles.container}>
         <h1 className={styles.center}>{detail?.name}</h1>
         <p className={styles.center}>{detail?.symbol}</p>

         <section className={styles.content}>
            <p>
               <strong>Preço:</strong> {detail?.formated_price}
            </p>
            <p>
               <strong>Maior preço em 24h:</strong> {detail?.formatedHighprice}
            </p>
            <p>
               <strong>Menor preço em 24h:</strong> {detail?.formatedLowprice}
            </p>
            <p>
               <strong>Detal 24h: </strong>
               <span
                  className={
                     Number.parseFloat(detail?.delta_24h) >= 0
                        ? styles.profit
                        : styles.loss
                  }
               >
                  {detail?.delta_24h}
               </span>
            </p>
            <p>
               <strong>Valor total de mercado:</strong>
               {detail?.formated_market}
            </p>
         </section>
      </div>
   );
}
