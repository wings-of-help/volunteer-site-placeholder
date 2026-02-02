import { useTranslation } from "react-i18next";
import RequestCart from "../RequestCart/RequestCart";
import "./ActiveGroup.scss"

type Props = {
  title: string;
  p: string;
  p2: string;
  seeAll: string;
}

export default function ActiveGroup({title, p, p2, seeAll}: Props) {
  const { t } = useTranslation();
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
          <RequestCart />
          <RequestCart />
          <RequestCart />
        </div>
        
      <div className="home-active-requests__see-all">
        <p className="home-active-requests__see-all__p">{seeAll}</p>
        <img 
          src="/images/ui/ph_arrow-right-light.png" 
          alt="arrow-right-button" 
          className="home-active-requests__see-all__button" 
        />
      </div>
    </div>
  )
}
