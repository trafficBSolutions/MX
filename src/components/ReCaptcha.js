import ReCAPTCHA from 'react-google-recaptcha';
import { useRef, useState } from 'react';

const SITE_KEY = process.env.REACT_APP_RECAPTCHA_SITE_KEY;

export const useRecaptcha = () => {
  const recaptchaRef = useRef(null);
  const [captchaToken, setCaptchaToken] = useState(null);
  const [captchaError, setCaptchaError] = useState('');

  const onCaptchaChange = (token) => {
    setCaptchaToken(token);
    if (token) setCaptchaError('');
  };

  const validateCaptcha = () => {
    if (!captchaToken) {
      setCaptchaError('Please complete the reCAPTCHA.');
      return false;
    }
    return true;
  };

  const resetCaptcha = () => {
    setCaptchaToken(null);
    if (recaptchaRef.current) recaptchaRef.current.reset();
  };

  return { recaptchaRef, captchaToken, captchaError, setCaptchaError, onCaptchaChange, validateCaptcha, resetCaptcha };
};

const ReCaptchaWidget = ({ recaptchaRef, onCaptchaChange, captchaError }) => (
  <div className="recaptcha-container" style={{ margin: '15px 0' }}>
    <ReCAPTCHA ref={recaptchaRef} sitekey={SITE_KEY} onChange={onCaptchaChange} />
    {captchaError && <div className="error-message">{captchaError}</div>}
  </div>
);

export default ReCaptchaWidget;
