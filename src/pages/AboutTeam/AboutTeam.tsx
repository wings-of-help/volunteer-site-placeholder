import { useTranslation } from 'react-i18next'
import './AboutTeam.scss'
import { useEffect, useState } from 'react';
import { GetTeammates } from '../../api/teammates.api';
import type { Teammate } from '../../api/types/teammates';
import AboutCart from '../../components/AboutCart/AboutCart';
import Loader from '../../components/UI-elements/Loader/Loader';

export default function AboutTeam() {
  const {t} = useTranslation();
  const [teammates, setTeammates] = useState<Teammate[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true)

    GetTeammates()
    .then(data => setTeammates(data))
    .catch(e => console.log(e))
    .finally(() => setTimeout(() => {
      setIsLoading(false)
    }, 1000))
  }, [])

  return (
    <div className="about__content">
      <div className="about__content__main">
        <div className="about__content__main__title">{t("Meet-Our-Team")}</div>
          <p className="about__content__main__p">
            {t("Team-description")}
          </p>
      </div>

        <div className="about__content__carts">
          {isLoading ? (
            <div className="loader-about">
              <Loader/>
            </div>
            ) : (<>
            {teammates.map(teammate => (
              <AboutCart
                key={teammate.id} 
                firstName={teammate.first_name}
                lastName={teammate.last_name}
                role={teammate.role}
                web={teammate.personal_website}
                socials={teammate.social_links}
                photo={teammate.photo}
              />
            ))}
            {/* {teammates.map(teammate => (
              <AboutCart
                key={teammate.id} 
                firstName={teammate.first_name}
                lastName={teammate.last_name}
                role={teammate.role}
                web={teammate.personal_website}
                // socials={teammate.social_links}
                photo={teammate.photo}
              />
            ))} */}
          </>
          )}
        </div>
    </div>
  )
}
