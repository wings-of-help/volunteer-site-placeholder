import CartItem from "../CartItem/CartItem";
import "./CatalogItems.scss"
import arrowDown from '../../assets/arrow-down.svg';
import { mockHelpCarts } from "../../api/helpCarts.api";
import type { HelpCart } from "../../api/types/HelpCart";
import { useEffect, useState } from "react";

type Props = {
  type: 'offers' | 'requests';
}

export default function CatalogItems({type}: Props) {
  const [carts, setCarts] = useState<HelpCart[]>(mockHelpCarts);
  
  useEffect(() => {
    setCarts(carts)
  }, [])
  
  return (
    <div className="catalog__container">
      <div className="catalog__items">
        {carts.map((cart: HelpCart) => {
          return <CartItem 
            type={type}
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
      
      <div className="catalog__load-more-button">
        Load more

        <img className="arrow" src={arrowDown} alt="dropdown" />
      </div>
    </div>
  )
}
