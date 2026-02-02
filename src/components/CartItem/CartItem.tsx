import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./CartItem.scss"

export default function CartItem() {
  const { isAuth } = useAuth();
  const { pathname } = useLocation()

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
        
        {isAuth && pathname === "/offers" ? 
          <div className="cart-item__status" style={{ maxWidth: "124px" }}>
            <img src="src/assets/Dot.png" alt="dot" />
            <p>Available</p>
          </div>
          :
          <div className="cart-item__status" style={{ maxWidth: "181px", gap: "8px" }}>
            <img src="src/assets/Hourglass.png" alt="hourglass" />
            <p>Waiting for help</p>
          </div>
        }
    </Link>
  )
}
