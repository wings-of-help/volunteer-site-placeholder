import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./CartItem.scss"
import dot from "../../assets/Ellipse 3.png"

type Props = {
  type: 'offers' | 'requests';
  id: number;
  title: string;
  location: string;
  description: string;
  category: string;
  status: "new" | "in progress" | "done";
}

export default function CartItem({title, location, description, category, status, id, type}: Props) {
  const { isAuth } = useAuth(); 
  return (
    <Link 
      to={`/${type}/${id}`}
      className="cart-item"
    >
        <h1 className="cart-item__title">{title}</h1>

        <div className="cart-item__header">
          <p className="cart-item__header__category">{category}</p>
        </div>


        <p className="cart-item__p">
          {description.length > 156 ? (
            `${description.slice(0, 156)}...`
          ) : (
            description
          )}
        </p>
        
        <div className="cart-item__bottom">
          <p className="cart-item__header__city">{location}</p>

          {isAuth && (
            <div className="cart-item__status">
              <img src={dot} alt="dot" />
              <p>{status}</p>
            </div>
          )}
        </div>
    </Link>
  )
}
