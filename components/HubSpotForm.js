import { useEffect } from 'react';
import styles from '../styles/HubSpotForm.module.css';

const HubSpotForm = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = '//js.hs-scripts.com/242999486.js';
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);

    const initializeForm = () => {
      if (window.hbspt) {
        window.hbspt.forms.create({
          region: "na1",
          portalId: "242999486",
          formId: "30c33fd0-8d8e-4d35-949d-2ade093e4b5d",
          target: "#hubspot-form"
        });
      } else {
        setTimeout(initializeForm, 500);
      }
    };

    setTimeout(initializeForm, 1000);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className={styles.leadFormSection}>
      <h2>Get Your Personalized LinkedIn Ads Strategy</h2>
      <p>Want expert help optimizing your LinkedIn campaigns? Get a free consultation with our team.</p>
      <div id="hubspot-form"></div>
    </div>
  );
};

export default HubSpotForm;