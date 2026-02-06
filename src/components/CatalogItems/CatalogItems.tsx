import CartItem from "../CartItem/CartItem";
import "./CatalogItems.scss"
import arrowDown from '../../assets/arrow-down.svg';
// import { useEffect, useState } from "react";
// import { GetHelpCarts } from "../../api/helpCarts.api";
import type { HelpCart } from "../../api/types/HelpCart";

export default function CatalogItems() {
  // const [carts, setCarts] = useState<HelpCart[]>([]);
  
  // useEffect(() => {
  //   GetHelpCarts().then(data => setCarts(data.results))
  // }, [])
  
  return (
    <div className="catalog__container">
      <div className="catalog__items">
        {/* {carts.map((cart: HelpCart) => {
          return <CartItem 
            key={cart.id}
            title={cart.title}
            location={cart.location_name}
            description={cart.description}
            status={cart.status}
            category={cart.category_name}
            />
        })} */}

        <CartItem 
          key={"Lviv"}
          title={"cart.title"}
          location={"cart.location_name"}
          description={"cart.description"}
          status={"cart.status"}
          category={"cart.category_name"}
          />
        <CartItem 
          key={"Lviv"}
          title={"cart.title"}
          location={"cart.location_name"}
          description={"cart.description"}
          status={"cart.status"}
          category={"cart.category_name"}
          />
        <CartItem 
          key={"Lviv"}
          title={"cart.title"}
          location={"cart.location_name"}
          description={"cart.description"}
          status={"cart.status"}
          category={"cart.category_name"}
          />
        <CartItem 
          key={"Lviv"}
          title={"cart.title"}
          location={"cart.location_name"}
          description={"cart.description"}
          status={"cart.status"}
          category={"cart.category_name"}
          />
        <CartItem 
          key={"Lviv"}
          title={"cart.title"}
          location={"cart.location_name"}
          description={"cart.description"}
          status={"cart.status"}
          category={"cart.category_name"}
          />
        <CartItem 
          key={"Lviv"}
          title={"cart.title"}
          location={"cart.location_name"}
          description={"cart.description"}
          status={"cart.status"}
          category={"cart.category_name"}
          />
        <CartItem 
          key={"Lviv"}
          title={"cart.title"}
          location={"cart.location_name"}
          description={"cart.description"}
          status={"cart.status"}
          category={"cart.category_name"}
          />
        <CartItem 
          key={"Lviv"}
          title={"cart.title"}
          location={"cart.location_name"}
          description={"cart.description"}
          status={"cart.status"}
          category={"cart.category_name"}
          />
        <CartItem 
          key={"Lviv"}
          title={"cart.title"}
          location={"cart.location_name"}
          description={"cart.description"}
          status={"cart.status"}
          category={"cart.category_name"}
          />
        <CartItem 
          key={"Lviv"}
          title={"cart.title"}
          location={"cart.location_name"}
          description={"cart.description"}
          status={"cart.status"}
          category={"cart.category_name"}
          />
        
      </div>
      
      <div className="catalog__load-more-button">
        Load more

        <img className="arrow" src={arrowDown} alt="dropdown" />
      </div>
    </div>
  )
}
