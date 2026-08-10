import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { Col, Row } from 'react-bootstrap';
import '../Listing/Listing.style.scss';
import FixedNavigation from '../../components/FixedNavigation/FixedNavigation.component';
import Footer from '../../components/Footer/Footer.component';
import { BLOG_ARTICLES } from '../../utils/constants';
import { useLocale, useMessages } from '../../i18n';
import { blogArticleHeading } from '../../i18n/blogArticleHeadings';
import { canonicalUrl, hreflangLinks } from '../../i18n/seo';
import { pathForKey } from '../../routes.config';

/**
 * The nav's "Blog" link used to go straight to a single article — the other
 * nine were only reachable if a visitor already happened to be on one of
 * them (via the OtherBlogs carousel). This is the index everything else
 * should have pointed at from the start.
 */
const BlogIndex = () => {
  const locale = useLocale();
  const m = useMessages();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="listingContainer">
      <Helmet>
        <meta charSet="utf-8" />
        <title>{m.blog.indexTitle}</title>
        <meta
          name="description"
          content={m.blog.indexDescription}
        />
        <link rel="canonical" href={canonicalUrl('blog', locale)} />
        {hreflangLinks('blog')}
      </Helmet>
      <FixedNavigation isBlog={true} />
      <Row className="subContainer" style={{ justifyContent: 'center' }}>
        <Col className="info col" lg={{ order: 'first', span: 8 }} md={{ order: 'first', span: 10 }} sm={12} xs={12}>
          <div className="heading title-container">
            <h1 className="title blog-title">{m.blog.indexHeading}</h1>
            <div className="border"></div>
          </div>
          <ul style={{ listStyle: 'none', padding: 0, marginTop: '2rem' }}>
            {BLOG_ARTICLES.map((article) => (
              <li key={article.key} style={{ marginBottom: '1.25rem', paddingBottom: '1.25rem', borderBottom: '1px solid rgba(0,0,0,0.1)' }}>
                <Link to={pathForKey(article.routeKey, locale)} style={{ fontSize: '1.2rem', fontWeight: 600 }}>
                  {blogArticleHeading(article.routeKey, locale)}
                </Link>
              </li>
            ))}
          </ul>
        </Col>
      </Row>
      <Footer locale={locale} />
    </div>
  );
};

export default BlogIndex;
