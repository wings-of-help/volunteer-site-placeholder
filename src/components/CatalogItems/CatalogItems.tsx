import CartItem from "../CartItem/CartItem";
import "./CatalogItems.scss"
import arrowDown from '../../assets/arrow-down.svg';

export default function CatalogItems() {
  return (
    <div className="catalog__container">
      <div className="catalog__items">
        <CartItem/>
        <CartItem/>
        <CartItem/>
        <CartItem/>
        <CartItem/>
        <CartItem/>
        <CartItem/>
        <CartItem/>
      </div>
      
      <div className="catalog__load-more-button">
        Load more

        <img className="arrow" src={arrowDown} alt="dropdown" />
      </div>
    </div>
  )
}
