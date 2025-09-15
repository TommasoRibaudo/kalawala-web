import React from 'react';
import CallToAction from '../../components/CallToAction/CallToAction.component';
import ContactUs from '../../components/ContactUs/ContactUs.component';
import FixedNavigation from '../../components/FixedNavigation/FixedNavigation.component';

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