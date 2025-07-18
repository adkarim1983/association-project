import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa";
import logo2 from "../assets/logo2.png";
import { useTranslation } from "react-i18next";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhoneVolume } from '@fortawesome/free-solid-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';


 
export default function Footer() {
     const { t } = useTranslation(); 
    return (
        <footer
            className="text-white py-10 px-6 transition duration-500 ease-in-out shadow-[inset_0_10px_15px_-10px_rgba(0,0,0,0.3)] hover:shadow-[0_0_20px_#666666]"
            style={{ backgroundColor: '#000000' }}
        >
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">

                <div>
                    <img src={logo2} alt="Logo Najm" className="h-24 mb-4" />
                    <p className="text-base text-justify">{t('footer.description')}</p>
                </div>

                <div>
                    <h3 className="text-lg sm:text-xl font-semibold mb-3 text-center md:text-left leading-tight">
                        <FontAwesomeIcon icon={faLocationDot} className="text-red-500 mr-2" />
                        {t('footer.address_title')}
                    </h3>
                    <p className="text-base" dir="ltr">{t('footer.address1')}</p>
                </div>

                <div>
                    <h3 className="text-lg sm:text-xl font-semibold mb-3 text-center md:text-left leading-tight">{t('footer.contact_title')}</h3>
                    <p className="text-base text-white">
                        <FontAwesomeIcon icon={faPhoneVolume} className="text-green-500 mr-2" />
                        <span dir="ltr">{t('footer.phone1')}</span>
                    </p>
                    <p className="text-base">
                        <FontAwesomeIcon icon={faPhoneVolume} className="text-green-500 mr-2" />
                        <span dir="ltr">{t('footer.phone_fixed')}</span>
                    </p>
                    <p className="text-base text-white">
                        <FontAwesomeIcon icon={faEnvelope} className="text-blue-500 mr-2" />
                        <span dir="ltr">contact@eerchad.ma</span>
                    </p>
                    <p className="text-base mt-2">
                        <FontAwesomeIcon icon={faLocationDot} className="text-red-500 mr-2" />
                        {t('footer.address2')}
                    </p>

                    <div className="flex mt-4 space-x-4">
                        <a href="https://www.facebook.com/" className="transition hover:scale-110 text-blue-600 hover:text-blue-500"><FaFacebook size={24} /></a>
                        <a href="https://www.instagram.com/" className="transition hover:scale-110 text-pink-500 hover:text-pink-400"><FaInstagram size={24} /></a>
                        <a href="https://x.com/" className="transition hover:scale-110 text-blue-400 hover:text-blue-300"><FaTwitter size={24} /></a>
                        <a href="https://fr.linkedin.com/" className="transition hover:scale-110 text-blue-700 hover:text-blue-600"><FaLinkedin size={24} /></a>
                    </div>
                </div>
            </div>

            <div className="mt-8 border-t border-white/30 pt-4 text-center text-base">
                © {new Date().getFullYear()} Association Najm. {t('footer.rights')}
            </div>
        </footer>
    );
}
