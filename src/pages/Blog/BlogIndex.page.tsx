import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { Col, Row } from 'react-bootstrap';
import '../Listing/Listing.style.scss';
import FixedNavigation from '../../components/FixedNavigation/FixedNavigation.component';
import Footer from '../../components/Footer/Footer.component';
import { BLOG_ARTICLES } from '../../utils/constants';

/**
 * The nav's "Blog" link used to go straight to a single article — the other
 * nine were only reachable if a visitor already happened to be on one of
 * them (via the OtherBlogs carousel). This is the index everything else
 * should have pointed at from the start.
 */
const BlogIndex = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="listingContainer">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Puerto Viejo Travel Guides | Reservas Kalawala</title>
        <meta
          name="description"
          content="Ten local guides to Puerto Viejo de Talamanca: getting there, getting around, and what to do once you're here."
        />
        <link rel="canonical" href="https://www.reservaskalawala.com/blog" />
        <link rel="alternate" hrefLang="en" href="https://www.reservaskalawala.com/blog" />
        <link rel="alternate" hrefLang="es" href="https://www.reservaskalawala.com/blogES" />
        <link rel="alternate" hrefLang="x-default" href="https://www.reservaskalawala.com/blog" />
      </Helmet>
      <FixedNavigation isBlog={true} />
      <Row className="subContainer" style={{ justifyContent: 'center' }}>
        <Col className="info col" lg={{ order: 'first', span: 8 }} md={{ order: 'first', span: 10 }} sm={12} xs={12}>
          <div className="heading title-container">
            <h1 className="title blog-title">Puerto Viejo Travel Guides</h1>
            <div className="border"></div>
          </div>
          <ul style={{ listStyle: 'none', padding: 0, marginTop: '2rem' }}>
            {BLOG_ARTICLES.map((article) => (
              <li key={article.key} style={{ marginBottom: '1.25rem', paddingBottom: '1.25rem', borderBottom: '1px solid rgba(0,0,0,0.1)' }}>
                <Link to={article.pathEn} style={{ fontSize: '1.2rem', fontWeight: 600 }}>
                  {article.titleEn}
                </Link>
              </li>
            ))}
          </ul>
        </Col>
      </Row>
      <Footer locale="en" />
    </div>
  );
};

export default BlogIndex;
