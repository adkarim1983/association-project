import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa";
import logo3 from "../assets/logo3.png";
import { useTranslation } from "react-i18next";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhoneVolume } from '@fortawesome/free-solid-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';


 
export default function Footer() {
     const { t } = useTranslation(); 
    return (
        <footer
            className="text-white py-10 px-6 transition duration-500 ease-in-out shadow-[inset_0_10px_15px_-10px_rgba(0,0,0,0.3)] hover:shadow-[0_0_20px_#2B7FFF]"
            style={{ backgroundColor: '#2B7FFF' }}
        >
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">

                <div>
                    <img src={logo3} alt="Logo Najm" className="h-20 mb-4" />
                    <p className="text-sm text-justify">{t('footer.description')}</p>
                </div>

                <div>
                    <h3 className="text-lg font-semibold mb-2">
                        <FontAwesomeIcon icon={faLocationDot} className="text-white mr-2" />
                        {t('footer.address_title')}
                    </h3>
                    <p className="text-sm">{t('footer.address1')}</p>
                </div>

                <div>
                    <h3 className="text-lg font-semibold mb-2">{t('footer.contact_title')}</h3>
                    <p className="text-sm text-white">
                        <FontAwesomeIcon icon={faPhoneVolume} className="text-white mr-2" />
                        {t('footer.phone1')}
                    </p>
                    <p className="text-sm">
                        <FontAwesomeIcon icon={faPhoneVolume} className="text-white mr-2" />
                        {t('footer.phone2')}
                    </p>
                    <p className="text-sm text-white">
                        <FontAwesomeIcon icon={faEnvelope} className="text-white mr-2" />
                        contact@eerchad.ma
                    </p>
                    <p className="text-sm mt-2">
                        <FontAwesomeIcon icon={faLocationDot} className="text-white mr-2" />
                        {t('footer.address2')}
                    </p>
                    <p className="text-sm">
                        <FontAwesomeIcon icon={faPhoneVolume} className="text-white mr-2" />
                        {t('footer.phone3')}
                    </p>

                    <div className="flex mt-4 space-x-4">
                        <a href="https://www.facebook.com/" className="transition hover:scale-110 hover:text-white/90"><FaFacebook size={20} /></a>
                        <a href="https://www.instagram.com/" className="transition hover:scale-110 hover:text-white/90"><FaInstagram size={20} /></a>
                        <a href="https://x.com/" className="transition hover:scale-110 hover:text-white/90"><FaTwitter size={20} /></a>
                        <a href="https://fr.linkedin.com/" className="transition hover:scale-110 hover:text-white/90"><FaLinkedin size={20} /></a>
                    </div>
                </div>
            </div>

            <div className="mt-8 border-t border-white/30 pt-4 text-center text-sm">
                © {new Date().getFullYear()} Association Najm. {t('footer.rights')}
            </div>
        </footer>
    );
}
