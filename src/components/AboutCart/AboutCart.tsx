import { Link } from 'react-router-dom'
import './AboutCart.scss'
import telegramIcon from '../../assets/Telegram-icon.svg';
import mailIcon from '../../assets/mailIcon.svg';
import gitHubIcon from '../../assets/GitHubIcon.svg';
import linkedInIcon from '../../assets/LinkedInIcon.svg';
import webIcon from '../../assets/webIcon.svg';
import facebookIcon from '../../assets/Facebook-icon.svg';
import instagramIcon from '../../assets/Instagram-icon.svg';

type Social = {
  id: number;
  name: string;
  link: string;
}

type Props = {
  firstName: string;
  lastName: string;
  role: string;
  web: string;
  socials: Social[]
  photo: string;
}

export default function AboutCart({firstName, lastName, role, web, photo, socials}: Props) {
  const socialIcons: Record<string, string> = {
    telegram: telegramIcon,
    email: mailIcon,
    github: gitHubIcon,
    linkedin: linkedInIcon,
    instagram: instagramIcon,
    facebook: facebookIcon,
  };
  return (
    <div className="about-cart">
      <img className="about-cart__image" src={photo} alt="teammate-photo" />
      {/* <div className="about-cart__image"></div> */}

      <div className="about-cart__info">
        <p className="about-cart__info__name">{`${firstName} ${lastName}`}</p>
        <p className="about-cart__info__role">{role}</p>
      </div>

      <div className="about-cart__socials">
        <div className="about-cart__socials">
          {socials.map(social => (
            <Link
              key={social.id}
              to={social.link}
              className="about-cart__socials__link"
              target="_blank"
            >
              <img
                src={socialIcons[social.name.toLowerCase()]}
                alt={social.name}
              />
            </Link>
          ))}

          {web && (
            <Link
              to={web}
              className="about-cart__socials__link"
              target="_blank"
            >
              <img src={webIcon} alt="website" />
            </Link>
          )}
        </div>
        
        {/* <Link to={""} className="about-cart__socials__link">
          <img src={mailIcon} alt="mailIcon" />
        </Link>
        <Link to={""} className="about-cart__socials__link">
          <img src={linkedInIcon} alt="linkedInIcon" />
        </Link>
        <Link to={""} className="about-cart__socials__link">
          <img src={gitHubIcon} alt="linkedInIcon" />
        </Link> */}
        {/* <Link to={web} className="about-cart__socials__link">
          <img src={webIcon} alt="webIcon" />
        </Link> */}
        {/* <Link to={web} className="about-cart__socials__link">
          <img src={instagramIcon} alt="instagramIcon" />
        </Link> */}
        {/* <Link to={web} className="about-cart__socials__link">
          <img src={facebookIcon} alt="facebookIcon" />
        </Link> */}
      </div>
    </div>
  )
}
