import { useTranslation } from 'react-i18next'
import './AboutTeam.scss'

export default function AboutTeam() {
  const {t} = useTranslation();
  return (
    <div className='about__content'>
      <h1>{t("Meet-Our-Team")}</h1>
      <p>{t("Team-description")}</p>
    </div>
  )
}
