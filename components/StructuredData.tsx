import { siteUrl } from '@/lib/site';

interface StructuredDataProps {
  type: 'website' | 'profile' | 'article' | 'portfolio';
  data?: any;
}

export function StructuredData({ type, data }: StructuredDataProps) {
  const getStructuredData = () => {
    const baseData = {
      '@context': 'https://schema.org',
      '@type': type === 'website' ? 'WebSite' : type === 'profile' ? 'Person' : 'CreativeWork',
      name: 'William Armstrong',
      url: siteUrl(),
      logo: siteUrl('/william.png'),
    };

    if (type === 'profile') {
      return {
        ...baseData,
        '@type': 'Person',
        givenName: 'William',
        familyName: 'Armstrong',
        description: 'Solutions Engineer bridging product, engineering, and business — automation, integrations, and systems thinking',
        image: siteUrl('/william.png'),
        sameAs: [
          'https://www.linkedin.com/in/william-armstrong8/',
          'https://github.com/williamarmstrong8'
        ],
        knowsAbout: [
          'Solutions Engineering',
          'Systems Architecture',
          'Technical Integrations',
          'Automation & Workflows',
          'Human-Centered Design',
          'Entrepreneurship',
          'Software Development'
        ],
        alumniOf: {
          '@type': 'EducationalOrganization',
          name: 'Boston College',
          department: 'Human-Centered Engineering'
        },
        jobTitle: 'Solutions Engineer',
        worksFor: {
          '@type': 'Organization',
          name: 'Various Entrepreneurial Ventures'
        },
        contactPoint: {
          '@type': 'ContactPoint',
          email: 'williamarmstrong8@gmail.com',
          contactType: 'Professional'
        }
      };
    }

    if (type === 'website') {
      return {
        ...baseData,
        '@type': 'WebSite',
        description: 'Portfolio of William Armstrong: Solutions Engineer bridging product, engineering, and business. Entrepreneur and builder.',
      };
    }

    if (type === 'article' && data) {
      return {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: data.title,
        description: data.excerpt,
        image: data.image ? siteUrl(data.image) : siteUrl('/william.png'),
        datePublished: data.date,
        dateModified: data.date,
        url: data.url ? siteUrl(data.url) : siteUrl(),
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': data.url ? siteUrl(data.url) : siteUrl(),
        },
        author: {
          '@type': 'Person',
          name: 'William Armstrong',
          url: siteUrl(),
        },
        publisher: {
          '@type': 'Person',
          name: 'William Armstrong',
          url: siteUrl(),
        },
      };
    }

    return baseData;
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(getStructuredData()),
      }}
    />
  );
}