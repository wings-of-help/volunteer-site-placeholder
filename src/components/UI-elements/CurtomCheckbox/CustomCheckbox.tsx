import { useState } from "react";
import "./CustomCheckbox.scss"
import checkIcon from '../../../assets/checkbox-check.svg';

type Props = {
  title: string;
}

export default function CustomCheckbox({title}: Props) {
  const [agree, setAgree] = useState(false);

  return (
    <label className='custom__checkbox'>
        <span
          className={`custom__checkbox-box ${
            agree ? 'custom__checkbox-box--checked' : ''
          }`}
          onClick={() => setAgree(!agree)}
        >
          {agree && <img src={checkIcon} alt='checked' />}
        </span>

        <span className='custom__checkbox-text'>
          {title}
        </span>
      </label>
  )
}
