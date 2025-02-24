import { Share } from '@/components/share';

import { getApiRootUrl } from '../../lib/utils/url';

export const PostAuthor = ({ settings, post }) => {
  const { slug, title, excerpt, author, type } = post;
  const isPage = type === 'page';

  const postUrl = `${settings.site_url}${slug}`;

  return (
    <address
      className={'flex items-center not-italic ' + (isPage && ' hidden')}
    >
      <div className="flex w-full items-center text-sm text-gray-900 dark:text-white gap-2">
        {author.avatar && (
          <div className="max-h-16 max-w-16">
            <img
              src={author.avatar}
              width={64}
              height={64}
              alt={author.name}
              style={{ objectFit: 'cover' }}
              className="w-full h-full rounded-full dark:bg-slate-800 bg-slate-200 p-2 object-cover"
            />
          </div>
        )}
        <div className="w-full">
          <div className="flex flex-1 items-center justify-between">
            <a
              href={`${getApiRootUrl()}/@${author.username}`}
              target="_blank"
              className="font-sans text-lg md:text-xl font-bold text-gray-900 dark:text-white"
              rel="noreferrer"
            >
              {author.name}
            </a>
            <Share
              title={title}
              summary={excerpt}
              url={postUrl}
              className="hidden md:flex"
            />
          </div>
          <p className="text-md font-normal text-gray-500 dark:text-gray-300">
            {author.occupation}
          </p>
        </div>
      </div>
    </address>
  );
};
