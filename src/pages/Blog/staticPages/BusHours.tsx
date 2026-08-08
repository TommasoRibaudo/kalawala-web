import React, { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import '../../Listing/Listing.style.scss';
import FixedNavigation from "../../../components/FixedNavigation/FixedNavigation.component";
import ContactUs from "../../../components/ContactUs/ContactUs.component";
import { Helmet } from "react-helmet";
import { blogs, blogsES } from "../../../assets/blogs/blogs";
import OtherBlogs from "../Components/OtherBlogs.Component";
import Smoobu2 from "../../../components/Smoobu2/Smoobu2.component";
import StayRecommendation from "../../../components/StayRecommendation/StayRecommendation.component";
import WhyStayWithUs from "../../../components/WhyStayWithUs/WhyStayWithUs.component";
import { GENERAL_PUERTO_VIEJO_RECOMMENDATIONS, GENERAL_PUERTO_VIEJO_RECOMMENDATIONS_ES } from "../../../utils/constants";
import { useLocale, useMessages } from "../../../i18n";
import { localeSuffix, bookingLanguage, homePath } from "../../../i18n/paths";
import { canonicalUrl, hreflangLinks } from "../../../i18n/seo";
import { busHoursContent, BusHoursContent } from "../../../i18n/content/blog";

const HERO_IMAGE = "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/Lim%C3%B3n_Province%2C_Sixaola%2C_Costa_Rica_-_panoramio_%282%29.jpg/960px-Lim%C3%B3n_Province%2C_Sixaola%2C_Costa_Rica_-_panoramio_%282%29.jpg";

const badges = (times: string[], color: string) => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(80px, 1fr))', gap: '8px', fontSize: '14px' }}>
        {times.map((time) => (
            <span key={time} style={{ backgroundColor: color, padding: '4px 8px', borderRadius: '4px', textAlign: 'center' }}>{time}</span>
        ))}
    </div>
);

const SimpleScheduleTable = ({ content, rows }: { content: BusHoursContent, rows: [string, string[]][] }) => (
    <div style={{ overflowX: 'auto', marginBottom: '20px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid #ddd' }}>
            <thead>
                <tr style={{ backgroundColor: '#f5f5f5' }}>
                    <th style={{ border: '1px solid #ddd', padding: '12px', textAlign: 'left', width: '50%' }}>{content.tableRouteHeader}</th>
                    <th style={{ border: '1px solid #ddd', padding: '12px', textAlign: 'center', width: '50%' }}>{content.tableDepartureHeader}</th>
                </tr>
            </thead>
            <tbody>
                {rows.map(([route, times], i) => (
                    <tr key={route} style={i % 2 === 1 ? { backgroundColor: '#f9f9f9' } : undefined}>
                        <td style={{ border: '1px solid #ddd', padding: '12px', verticalAlign: 'top' }}><strong>{route}</strong></td>
                        <td style={{ border: '1px solid #ddd', padding: '12px', verticalAlign: 'top' }}>{badges(times, '#e8f4f8')}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
);

const SplitScheduleTable = ({ content, rows }: { content: BusHoursContent, rows: [string, string[], string[]][] }) => (
    <div style={{ overflowX: 'auto', marginBottom: '20px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid #ddd' }}>
            <thead>
                <tr style={{ backgroundColor: '#f5f5f5' }}>
                    <th style={{ border: '1px solid #ddd', padding: '12px', textAlign: 'left', width: '25%' }}>{content.tableRouteHeader}</th>
                    <th style={{ border: '1px solid #ddd', padding: '12px', textAlign: 'center', width: '37.5%' }}>{content.tableWeekdayHeader}</th>
                    <th style={{ border: '1px solid #ddd', padding: '12px', textAlign: 'center', width: '37.5%' }}>{content.tableSundayHeader}</th>
                </tr>
            </thead>
            <tbody>
                {rows.map(([route, weekday, sunday], i) => (
                    <tr key={route} style={i % 2 === 1 ? { backgroundColor: '#f9f9f9' } : undefined}>
                        <td style={{ border: '1px solid #ddd', padding: '12px', verticalAlign: 'top' }}><strong>{route}</strong></td>
                        <td style={{ border: '1px solid #ddd', padding: '12px', verticalAlign: 'top' }}>{badges(weekday, '#e8f4f8')}</td>
                        <td style={{ border: '1px solid #ddd', padding: '12px', verticalAlign: 'top' }}>{badges(sunday, '#f0f8e8')}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
);

const BusHours = () => {
    const locale = useLocale();
    const m = useMessages();
    const content = busHoursContent(locale);
    const lang = bookingLanguage(locale);
    const selfId = `bushours${localeSuffix(locale)}`;

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])
    return (

        <div className={`listingContainer`}>
            <Helmet>
                <meta charSet="utf-8" />
                <title>{content.seoTitle}</title>
                <meta name="description" content={content.seoDescription} />
                <link rel="canonical" href={canonicalUrl('blogBushours', locale)} />
                {hreflangLinks('blogBushours')}
            </Helmet>
            <FixedNavigation isBlog={true} />
            <Row className="subContainer" style={{ justifyContent: 'center' }}>

                <Col className="info col" lg={{ order: 'first', span: 8 }} md={{ order: 'first', span: 10 }} sm={12} xs={12}>

                    <div className="blog-header" style={{ maxWidth: 1000, marginBottom: '2rem' }}>
                        <div className="heading title-container">
                            <h1 className="title blog-title">{content.heading}</h1>
                            <div className="border"></div>
                        </div>

                        <div className="blog-hero-image" style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            marginTop: '1.5rem',
                            borderRadius: '8px',
                            overflow: 'hidden',
                            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
                        }}>
                            <img
                                loading="eager"
                                fetchPriority="high"
                                decoding="async"
                                src={HERO_IMAGE}
                                className="responsive-image"
                                style={{
                                    maxWidth: '100%',
                                    height: 'auto',
                                    display: 'block'
                                }}
                                alt="MEPE Bus in Puerto Viejo"
                                width="1000"
                                height="600"
                            />
                            <p style={{ fontSize: '0.85rem', margin: '4px 0 0' }}>{content.photoCredit}</p>
                        </div>
                    </div>
                    <div className="description" style={{ maxWidth: 1000, }}>
                        <p>{content.introParagraph}</p>
                        <br />
                        <h3><strong>{content.aboutHeading}</strong></h3>
                        <p>{content.aboutParagraph1}</p>
                        <br />
                        <p>{content.aboutParagraph2}</p>
                        <br />

                        {/* Stay Recommendation Component - positioned in middle of article */}
                        <StayRecommendation
                            title={content.stayRecommendationTitle}
                            properties={locale === 'es' ? GENERAL_PUERTO_VIEJO_RECOMMENDATIONS_ES : GENERAL_PUERTO_VIEJO_RECOMMENDATIONS}
                            language={lang}
                        />
                        <br />

                        <h3><strong>{content.routesHeading}</strong></h3>
                        <p>{content.routesIntro}</p>
                        <ul>
                            {content.destinations.map((d) => <li key={d}><strong>{d.split(' - ')[0]}</strong> - {d.split(' - ')[1]}</li>)}
                        </ul>
                        <br />
                        <h3><strong>{content.schedulesHeading}</strong></h3>
                        <br />
                        <h4><strong>{content.sanJoseHeading}</strong></h4>
                        <p>{content.sanJoseIntro}</p>
                        <br />
                        <SimpleScheduleTable content={content} rows={[
                            ['San José → Puerto Viejo', ['6:00 AM', '8:00 AM', '10:00 AM', '2:00 PM', '4:00 PM']],
                            ['Puerto Viejo → San José', ['3:00 AM', '5:30 AM', '9:00 AM', '12:00 PM', '4:00 PM']],
                        ]} />
                        <br />
                        <h4><strong>{content.limonHeading}</strong></h4>
                        <p>{content.limonIntro}</p>
                        <br />
                        <SplitScheduleTable content={content} rows={[
                            ['Limón → Puerto Viejo',
                                ['5:30 AM', '6:30 AM', '7:30 AM', '8:30 AM', '9:30 AM', '10:30 AM', '11:30 AM', '12:30 PM', '1:30 PM', '2:30 PM', '3:30 PM', '4:30 PM', '6:30 PM', '7:00 PM', '8:00 PM'],
                                ['6:30 AM', '8:30 AM', '9:30 AM', '10:30 AM', '11:30 AM', '12:30 PM', '2:30 PM', '4:30 PM', '6:30 PM', '7:00 PM', '8:00 PM']],
                            ['Puerto Viejo → Limón',
                                ['5:30 AM', '6:30 AM', '7:30 AM', '8:30 AM', '9:30 AM', '10:30 AM', '11:30 AM', '12:30 PM', '1:30 PM', '2:30 PM', '3:30 PM', '4:30 PM', '5:30 PM', '6:30 PM'],
                                ['5:30 AM', '7:30 AM', '9:30 AM', '11:30 AM', '1:30 PM', '3:30 PM', '5:30 PM', '6:30 PM', '8:15 PM']],
                        ]} />
                        <br />
                        <h4><strong>{content.manzanilloHeading}</strong></h4>
                        <p>{content.manzanilloIntro}</p>
                        <br />
                        <SimpleScheduleTable content={content} rows={[
                            ['Puerto Viejo → Manzanillo', ['7:40 AM', '8:10 AM', '9:40 AM', '11:40 AM', '1:40 PM', '4:40 PM', '6:40 PM']],
                            ['Manzanillo → Puerto Viejo', ['5:00 AM', '6:30 AM', '8:00 AM', '10:00 AM', '10:30 AM', '12:30 PM', '1:30 PM', '3:30 PM', '4:00 PM', '5:00 PM']],
                        ]} />
                        <br />
                        <h4><strong>{content.sixaolaHeading}</strong></h4>
                        <p>{content.sixaolaIntro}</p>
                        <br />
                        <SplitScheduleTable content={content} rows={[
                            ['Sixaola → Puerto Viejo',
                                ['5:30 AM', '6:30 AM', '7:30 AM', '8:30 AM', '9:30 AM', '10:30 AM', '11:30 AM', '12:30 PM', '1:30 PM', '2:30 PM', '3:30 PM', '4:30 PM', '5:30 PM', '7:00 PM'],
                                ['5:30 AM', '7:30 AM', '9:30 AM', '11:30 AM', '1:30 PM', '3:30 PM', '5:30 PM', '7:00 PM']],
                            ['Puerto Viejo → Sixaola',
                                ['6:30 AM', '7:30 AM', '8:30 AM', '9:30 AM', '10:30 AM', '11:30 AM', '12:30 PM', '1:30 PM', '2:30 PM', '3:30 PM', '4:30 PM', '5:30 PM', '6:30 PM', '7:30 PM', '8:15 PM'],
                                ['6:30 AM', '8:30 AM', '10:30 AM', '12:30 PM', '2:30 PM', '4:30 PM', '6:30 PM', '8:15 PM']],
                        ]} />
                    {/* Why Stay With Us Component - after main content, before OtherBlogs */}
                    <div style={{ maxWidth: 1000 }}>
                        <WhyStayWithUs
                            language={lang}
                            ctaLink={homePath(locale)}
                        />
                    </div>
                        <h3><strong>{content.tipsHeading}</strong></h3>
                        <ul>
                            {content.tipsListItems.map((item, i) => {
                                const [label, ...rest] = item.split(': ');
                                return <li key={i}><strong>{label}:</strong> {rest.join(': ')}</li>;
                            })}
                        </ul>
                        <br />
                        <h3><strong>{content.ticketsHeading}</strong></h3>
                        <p>{content.ticketsParagraph}</p>
                        <br />
                        <h3><strong>{content.contactHeading}</strong></h3>
                        <p>{content.contactIntro}</p>
                        <p><strong>WhatsApp: <a href="https://wa.me/50672852592" target="_blank" rel="noopener noreferrer">+(506) 7285-2592</a></strong></p>
                        <br />
                        <p>{content.closingParagraph}</p>
                    </div>


                    {/* Smoobu Booking Component */}
                    <div className="blog-smoobu-container" style={{ maxWidth: 1000, marginTop: '2rem', marginBottom: '2rem' }}>
                        <h2 className="smoobu-title">{m.blog.bookYourStay}</h2>
                        <div className="smoobu-wrapper">
                            <Smoobu2 targetId="blogSmoobuBooking" />
                        </div>
                    </div>

                    <OtherBlogs currentBlog={selfId} blogs={locale === 'es' ? blogsES : blogs} />
                </Col>
            </Row>
            <ContactUs />
        </div>
    )

}

export default BusHours;
