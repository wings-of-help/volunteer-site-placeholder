import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./CartItem.scss"
import dot from "../../assets/Ellipse 3.png"

export default function CartItem() {
  const { isAuth } = useAuth();

  return (
    <Link to={`cartId`} className="cart-item">
        <div className="cart-item__header">
          <p className="cart-item__header__city">Kyiv</p>
          <p className="cart-item__header__category">Food & Basic Supplies</p>
        </div>

        <h1 className="cart-item__title">Free Grocery Delivery for Displaced Families</h1>

        <p className="cart-item__p">
          A family of four who recently relocated is in urgent need 
          of food packages and basic hygiene supplies. Two children (ages 5 and 9). Assistance
          needed within the next 3 days.
        </p>
        
        {isAuth && (
          <div className="cart-item__status" style={{ maxWidth: "71px" }}>
            <img src={dot} alt="dot" />
            <p>New</p>
          </div>
          )
        }
    </Link>
  )
}
