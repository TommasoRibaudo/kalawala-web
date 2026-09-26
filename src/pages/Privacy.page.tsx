import React, { useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';
import { Helmet } from 'react-helmet';
import FixedNavigation from '../components/FixedNavigation/FixedNavigation.component';
import Footer from '../components/Footer/Footer.component';
import { useLocale } from '../i18n';
import { canonicalUrl, hreflangLinks } from '../i18n/seo';
import { privacyContent } from '../i18n/content/privacy';
import './Privacy.style.scss';

const Privacy = () => {
  const locale = useLocale();
  const content = privacyContent(locale);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="privacy-page">
      <Helmet>
        <meta charSet="utf-8" />
        <title>{content.seoTitle}</title>
        <meta name="description" content={content.seoDescription} />
        <link rel="canonical" href={canonicalUrl('privacy', locale)} />
        {hreflangLinks('privacy')}
      </Helmet>
      <FixedNavigation isBlog={false} />
      <Row className="subContainer privacy-container" style={{ justifyContent: 'center' }}>
        <Col lg={{ span: 8 }} md={{ span: 10 }} sm={12} xs={12}>
          <div className="privacy-header">
            <h1 className="title">{content.heading}</h1>
            <p className="privacy-effective-date">
              {content.effectiveDateLabel}: {content.effectiveDate}
            </p>
          </div>

          <div className="privacy-intro">{content.intro}</div>

          {content.sections.map((section) => (
            <section key={section.heading} className="privacy-section">
              <h2>{section.heading}</h2>
              {section.body}
            </section>
          ))}

          <section className="privacy-section privacy-contact">
            <h2>{content.contactHeading}</h2>
            <p>{content.contactIntro}</p>
          </section>
        </Col>
      </Row>
      <Footer locale={locale} />
    </div>
  );
};

export default Privacy;
