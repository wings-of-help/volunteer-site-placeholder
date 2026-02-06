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
  status: string;
}

export default function CartItem({title, location, description, category, status, id, type}: Props) {
  const { isAuth } = useAuth(); 
  return (
    <Link 
      to={`/${type}/${id}`}
      className="cart-item"
    >
        <div className="cart-item__header">
          <p className="cart-item__header__city">{location}</p>
          <p className="cart-item__header__category">{category}</p>
        </div>

        <h1 className="cart-item__title">{title}</h1>

        <p className="cart-item__p">
          {description}
        </p>
        
        {isAuth && (
          <div className="cart-item__status" style={{ maxWidth: "71px" }}>
            <img src={dot} alt="dot" />
            <p>{status}</p>
          </div>
          )
        }
    </Link>
  )
}
