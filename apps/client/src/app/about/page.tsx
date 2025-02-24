export const runtime = 'edge';

import { Metadata } from 'next';

import { getAbout } from '@/data';

import Custom404 from '../not-found';
import { StructuredData } from '../../components/structured-data';
import { About } from './about';

export default async function AboutPage() {
  const data = await getAbout();
  if (!data?.me || !data?.settings) return <Custom404 />;
  const { settings, me } = data;
  const { name, social } = me;

  // const { About } = getTheme(settings?.theme);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    headline: 'About',
    description: me.bio,
    image: me.avatar,
    author: [
      {
        '@type': 'Person',
        name: name,
      },
    ],
    publisher: {
      '@type': 'Organization',
      name: settings.site_title,
      logo: {
        '@type': 'ImageObject',
        url: me.avatar,
      },
    },
    mainEntityOfPage: {
      '@type': 'About',
      '@id': `${settings.site_url}/about`,
    },
  };

  return (
    <>
      <StructuredData data={jsonLd} />
      <About me={me} settings={settings} />
    </>
  );
}

export async function generateMetadata({
  params,
  searchParams,
}): Promise<Metadata> {
  const data = await getAbout();
  if (!data?.me || !data?.settings) return {};
  const { settings, me } = data;
  return {
    title: 'About',
    description: me.bio,
    category: 'Profile',
    twitter: {
      title: 'About',
      images: [
        {
          url: settings.banner?.src!,
          width: settings.banner?.width!,
          height: settings.banner?.height!,
          alt: settings.site_title,
        },
      ],
      card: 'summary_large_image',
      description: me.bio!,
    },
    alternates: {
      canonical: `${settings.site_url}/about`,
    },
    openGraph: {
      url: `${settings.site_url}/about`,
      title: 'About',
      description: me.bio!,
      authors: [me.name],
      firstName: me.name,
      siteName: settings.site_title,
      images: [
        {
          url: settings.banner?.src!,
          width: settings.banner?.width!,
          height: settings.banner?.height!,
          alt: settings.site_title,
        },
      ],
    },
  };
}
