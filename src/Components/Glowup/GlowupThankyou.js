import React, { useEffect } from "react";
import ReactPixel from 'react-facebook-pixel';

const options = {
    autoConfig: true, // set pixel's autoConfig. More info: https://developers.facebook.com/docs/facebook-pixel/advanced/
    debug: false, // enable logs
};

export default function GlowupThankyou() {

    useEffect(() => {
        document.title = "Thankyou"
    }, [])

    useEffect(() => {
        ReactPixel.init('297839162529717', options);
        ReactPixel.track("Lead")
    }, [])

    return (
        <div className="glowup">
            <div className="jumbotron text-center thankyouMain">
                <h1 className="display-3">Thank you for ordering</h1>
                <p className="lead">For fast Delivery do Whatsapp</p>
                <p className="lead">
                    <a className="btn btn-primary btn-sm" href=" https://wa.me/923192033546" role="button">Whatsapp</a>
                </p>
            </div>
        </div>
    )
}