import './calendar.scss';
import { ItemBase } from '@shared-interfaces/items';

export const Calendar = () => {
  const days = ['Samedi', 'Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi'];
  const divers: ItemBase[] = [
    {
      id: 1,
      label: 'Article 1',
      description: 'Ma description',
      webImage: 'https://assets.afcdn.com/recipe/20170112/3678_w640h486c1cx1500cy1073.webp',
      tags: [],
    },
    {
      id: 2,
      label: 'Recette1 1',
      description: 'Ma description',
      webImage: 'https://assets.afcdn.com/recipe/20170112/3678_w640h486c1cx1500cy1073.webp',
      tags: [],
      articlesList: [],
    },
  ];

  return (
    <div className='Calendar'>
      {divers.map(d => (
        <div className='divers'>

        </div>
      ))}

      {days.map(d => (
        <div key={d} className='day'>
          <h4>{d}</h4>
          <hr />
        </div>
      ))}
    </div>
  );
};
