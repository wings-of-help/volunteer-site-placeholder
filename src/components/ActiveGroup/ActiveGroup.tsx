// import { useTranslation } from "react-i18next";
import { useEffect, useMemo, useState } from "react";
import type { HelpCart } from "../../api/types/HelpCart";
// import CartItem from "../CartItem/CartItem";
import "./ActiveGroup.scss"
import { Link } from "react-router-dom";
import vector from "../../assets/Vector.svg"
import { GetHelpCarts } from "../../api/helpCarts.api";
import CartItem from "../CartItem/CartItem";
// import { GetHelpCarts } from "../../api/helpCarts.api";

type Props = {
  title: string;
  p?: string;
  p2?: string;
  seeAll: string;
  path: string;
}

export default function ActiveGroup({title, p = "", p2 = "", seeAll, path}: Props) {
  const [carts, setCarts] = useState<HelpCart[]>([]);

    useEffect(() => {
      GetHelpCarts().then((data) => {
        setCarts(data.results);
      });
    }, []);

    const cartType: "offer" | "request" =
      path === "offers" ? "offer" : "request";

    const filteredCarts = useMemo(() => {
      return carts.filter((cart) => cart.kind === cartType).slice(0, 3);
    }, [carts, cartType]);
  
  return (
    <div className="home-active-requests">

      <div className="home-active-requests__main">
          <div className="home-active-requests__main__title">{title}</div>
          <div className="home-active-requests__main__paragraphs">
            <p className="home-active-requests__main__paragraphs__p">
              {p}
            </p>
            <p className="home-active-requests__main__paragraphs__p">
              {p2}
            </p>
          </div>
        </div>

        <div className="home-active-requests__carts">
          {filteredCarts.map((cart: HelpCart) => {
            return <CartItem
              type={path.replace("/", "") as 'offers' | 'requests'}
              kind={cart.kind}
              key={cart.id}
              id={cart.id}
              title={cart.title}
              location={cart.location_name}
              description={cart.description}
              status={cart.status}
              category={cart.category_name}
              />
          })}
         
        </div>
        
        <Link to={path} className="home-active-requests__see-all">
          <p className="home-active-requests__see-all__p">{seeAll}</p>
          <img 
            src={vector} 
            alt="arrow-right-button" 
            className="home-active-requests__see-all__button" 
          />
        </Link>
    </div>
  )
}
