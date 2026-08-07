import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { Col, Row } from 'react-bootstrap';
import '../Listing/Listing.style.scss';
import Footer from '../../components/Footer/Footer.component';
import { BLOG_ARTICLES } from '../../utils/constants';
import FixedNavigation from '../../components/FixedNavigation/FixedNavigation.component';

const BlogIndexES = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="listingContainer">
      <Helmet>
        <html lang="es" />
        <meta charSet="utf-8" />
        <title>Guías de Viaje de Puerto Viejo | Reservas Kalawala</title>
        <meta
          name="description"
          content="Diez guías locales de Puerto Viejo de Talamanca: cómo llegar, cómo moverte y qué hacer una vez que estés aquí."
        />
        <link rel="canonical" href="https://www.reservaskalawala.com/blogES" />
        <link rel="alternate" hrefLang="en" href="https://www.reservaskalawala.com/blog" />
        <link rel="alternate" hrefLang="es" href="https://www.reservaskalawala.com/blogES" />
        <link rel="alternate" hrefLang="x-default" href="https://www.reservaskalawala.com/blog" />
      </Helmet>
      <FixedNavigation isBlog={true} />
      <Row className="subContainer" style={{ justifyContent: 'center' }}>
        <Col className="info col" lg={{ order: 'first', span: 8 }} md={{ order: 'first', span: 10 }} sm={12} xs={12}>
          <div className="heading title-container">
            <h1 className="title blog-title">Guías de Viaje de Puerto Viejo</h1>
            <div className="border"></div>
          </div>
          <ul style={{ listStyle: 'none', padding: 0, marginTop: '2rem' }}>
            {BLOG_ARTICLES.map((article) => (
              <li key={article.key} style={{ marginBottom: '1.25rem', paddingBottom: '1.25rem', borderBottom: '1px solid rgba(0,0,0,0.1)' }}>
                <Link to={article.pathEs} style={{ fontSize: '1.2rem', fontWeight: 600 }}>
                  {article.titleEs}
                </Link>
              </li>
            ))}
          </ul>
        </Col>
      </Row>
      <Footer locale="es" />
    </div>
  );
};

export default BlogIndexES;
