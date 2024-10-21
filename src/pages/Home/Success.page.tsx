import CallToAction from '../../components/CallToAction/CallToAction.component';
import ContactUs from '../../components/ContactUs/ContactUs.component';
import FixedNavigation from '../../components/FixedNavigation/FixedNavigation.component';
import Portfolio from '../../components/Portfolio/Portfolio.component';

const Success = () => {

    return (
        <div id="body">
            <FixedNavigation isBlog={false} />
            <CallToAction />
            <ContactUs />
        </div>
    )
}

export default Success;