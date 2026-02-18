import { Metadata } from 'next';

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
      url: 'https://williamarmstrong.dev',
      logo: 'https://williamarmstrong.dev/william.png',
    };

    if (type === 'profile') {
      return {
        ...baseData,
        '@type': 'Person',
        givenName: 'William',
        familyName: 'Armstrong',
        description: 'Product Engineer specializing in human-centered design and entrepreneurship',
        image: 'https://williamarmstrong.dev/william-armstrong-og.png',
        sameAs: [
          'https://www.linkedin.com/in/william-armstrong8/',
          'https://github.com/williamarmstrong8'
        ],
        knowsAbout: [
          'Product Engineering',
          'Human-Centered Design',
          'Entrepreneurship',
          'UI/UX Design',
          'Software Development',
          'Venture Building'
        ],
        alumniOf: {
          '@type': 'EducationalOrganization',
          name: 'Boston College',
          department: 'Human-Centered Engineering'
        },
        jobTitle: 'Product Engineer',
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
        description: 'Portfolio of William Armstrong: Product Engineer specializing in human-centered design, entrepreneur, and creative professional.',
        potentialAction: {
          '@type': 'SearchAction',
          target: 'https://williamarmstrong.dev/search?q={search_term_string}',
          'query-input': 'required name=search_term_string'
        }
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