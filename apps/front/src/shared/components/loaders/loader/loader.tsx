import Maple from '../maple.png';
import './loader.scss';

export const Loader = (): JSX.Element => {
  return (
    <div className='Loader'>
      <img src={Maple} alt='maple-loader-not-working' aria-label='maple-loader-not-working' />
    </div>
  );
};
