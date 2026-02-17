import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./CartItem.scss"
import type { HelpStatus } from "../../api/types/help";
import StatusBlock from "../UI-elements/StatusBlock/StatusBlock";

type Props = {
  type: 'offers' | 'requests';
  id: number;
  title: string;
  location: string;
  description: string;
  category: string;
  status: HelpStatus;
  kind: "offer" | "request";
}

export default function CartItem({title, location, description, category, status, id, type}: Props) {
  const { isAuth } = useAuth(); 
  return (
    <Link 
      to={`/${type}/${id}`}
      className="cart-item"
    >
        <h1 className="cart-item__title">
          {title.length > 43? (
            `${title.slice(0, 43)}...`
          ) : (
            title
          )}
          {/* {title} */}
        </h1>

        <div className="cart-item__header">
          <p className="cart-item__header__category">{category}</p>
        </div>


        <p className="cart-item__p">
          {description.length > 146 ? (
            `${description.slice(0, 146)}...`
          ) : (
            description
          )}
        </p>
        
        <div className="cart-item__bottom">
          <p className="cart-item__header__city">{location}</p>

          {isAuth && (
            <StatusBlock status={status}/>
          )}
        </div>
    </Link>
  )
}
