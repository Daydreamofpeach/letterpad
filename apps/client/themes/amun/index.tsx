// You do not have to edit this page

import dynamic from 'next/dynamic';

export const HomePosts = dynamic(() =>
  import('./home_posts').then((mod) => mod.HomePosts)
);
