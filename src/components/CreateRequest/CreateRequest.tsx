import { useState } from 'react';
import './CreateRequest.scss';
import breakIcon from '../../assets/ep_arrow-left.svg';

interface Props {
  onBack: () => void;
}

export const CreateRequest = ({ onBack }: Props) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const isTitleValid = title.length > 0 && title.length <= 80;
  const isDescriptionValid =
    description.length >= 500 && description.length <= 1000;

  const isFormValid = isTitleValid && isDescriptionValid;

  const capitalizeFirstLetter = (value: string) => {
    if (!value) return value;
    return value.charAt(0).toUpperCase() + value.slice(1);
  };

  return (
    <div className='create-request'>
      <div className='create-request__header'>
        <button className='create-request__back' onClick={onBack}>
          <img src={breakIcon} alt='back icon' />
          <span>Back to My Requests</span>
        </button>

        <h1 className='create-request__title'>Create New Request</h1>
      </div>

      <form className='create-request__form'>
        <div className='create-request__field'>
          <label className='create-request__label'>Title</label>
          <input
            className='create-request__input'
            placeholder='Add title here...'
            value={title}
            maxLength={80}
            onChange={(e) => {
              const value = e.target.value;
              setTitle(capitalizeFirstLetter(value));
            }}
          />
          <span className='create-request__hint'>
            Max length ~80 characters
          </span>
        </div>

        <div className='create-request__field'>
          <label className='create-request__label'>Category</label>
          <select className='create-request__select'>
            <option value=''>Choose a category</option>
            // Буде заповнено динамічно пізніше
            <option value='medicine'>Medicine</option>
            <option value='food'>Food</option>
          </select>
        </div>

        <div className='create-request__field'>
          <label className='create-request__label'>City</label>
          <select className='create-request__select'>
            <option value=''>Choose a city</option>
            // Буде заповнено динамічно пізніше
            <option value='Kyiv'>Kyiv</option>
            <option value='Lviv'>Lviv</option>
          </select>
        </div>

        <div className='create-request__field'>
          <label className='create-request__label'>Description</label>
          <textarea
            className='create-request__textarea'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder='Provide details about your request, including number of people affected, urgency, and any special needs'
            onInput={(e) => {
              const el = e.currentTarget;
              el.style.height = 'auto';
              el.style.height = el.scrollHeight + 'px';
            }}
          />
          <span className='create-request__hint'>
            {description.length} / 1000 characters (min 500)
          </span>
        </div>

        <div className='create-request__actions'>
          <button type='button' className='create-request__cancel'>
            Cancel
          </button>
          <button
            type='submit'
            className={`create-request__publish ${
              isFormValid ? 'create-request__publish--active' : ''
            }`}
            disabled={!isFormValid}
          >
            Publish
          </button>
        </div>
      </form>
    </div>
  );
};
