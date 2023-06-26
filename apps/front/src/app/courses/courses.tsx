import './courses.scss';
import { ArticleTags, ItemBase, ItemType } from '@shared-interfaces/items';
import { Button } from '@mui/material';

export const Courses = () => {
  const items: ItemBase[] = [
    {
      id: 1,
      label: 'Article 1',
      itemType: ItemType.ARTICLE,
      description: 'Ma description',
      webImage: 'https://assets.afcdn.com/recipe/20170112/3678_w640h486c1cx1500cy1073.webp',
      tags: [ArticleTags.EPICERIE],
    },
    {
      id: 3,
      label: 'Article 2',
      itemType: ItemType.ARTICLE,
      description: 'Ma description',
      webImage: 'https://assets.afcdn.com/recipe/20170112/3678_w640h486c1cx1500cy1073.webp',
      tags: [ArticleTags.ENTRETIEN],
    },
    {
      id: 4,
      label: 'Article 3',
      itemType: ItemType.ARTICLE,
      description: 'Ma description',
      webImage: 'https://assets.afcdn.com/recipe/20170112/3678_w640h486c1cx1500cy1073.webp',
      tags: [ArticleTags.ENTRETIEN],
    },
    {
      id: 5,
      label: 'Article 4',
      itemType: ItemType.ARTICLE,
      description: 'Ma description',
      webImage: 'https://assets.afcdn.com/recipe/20170112/3678_w640h486c1cx1500cy1073.webp',
      tags: [ArticleTags.BOISSONS],
    },
    {
      id: 8,
      label: 'Article 16',
      itemType: ItemType.ARTICLE,
      description: 'Ma description',
      webImage: 'https://assets.afcdn.com/recipe/20170112/3678_w640h486c1cx1500cy1073.webp',
      tags: [ArticleTags.EPICERIE],
    },
  ];
  const ItemsSortedByTags: ArticleTags[] = SortByTags(items);

  console.log(ItemsSortedByTags);

  return (
    <div className='Courses'>
      <Button>RàZ</Button>
      {items.map(item => (
        <div key={item.id}>
          [] - <span>{item.label}</span>
        </div>
      ))}
    </div>
  );
};

const SortByTags = (items: ItemBase[]): ArticleTags[] => {
  const extractAllTags = items.map(item => item.tags[0] as ArticleTags);
  const tags = extractAllTags.filter((value, index) => extractAllTags.indexOf(value) === index);

  // Each tag should be an index !
  const test =items.map(item => {

  })
  console.log(test);
  return tags;
};
