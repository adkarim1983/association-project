import SupportedEnterprisesMap from "../components/SupportedEnterprisesMap";
import { useTranslation } from "react-i18next";

export default function Contact() {
  const { t } = useTranslation();

  return (
    <>
      <section id="contact" className="py-10 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-[#1C398E]/5 rounded-full opacity-70 -mr-20 -mt-20 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-[#1C398E]/5 rounded-full opacity-70 -ml-20 -mb-20 blur-3xl"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(28,57,142,0.05)_1px,transparent_0)] bg-[length:40px_40px]"></div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <span className="text-[#1C398E] font-medium uppercase tracking-wider text-sm">{t("contact.stayInTouch")}</span>
            <h2 className="text-[30px] font-bold text-[#1C398E] mt-3 mb-4">{t("contact.title")}</h2>
            <div className="w-20 h-1 bg-[#1C398E] mx-auto rounded-full mb-6 transform transition-all duration-300 hover:w-32"></div>
            <p className="text-gray-600 text-lg leading-relaxed">{t("contact.paragraph")}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 mt-12">
            {/* Formulaire */}
            <div className="bg-white p-8 rounded-3xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
              <h3 className="text-[30px] font-bold text-[#1C398E] mb-8 text-center md:text-left">{t("contact.formTitle")}</h3>
              <form className="space-y-6">
                {["name", "email", "subject"].map((field) => (
                  <div className="relative" key={field}>
                    <label htmlFor={field} className="block text-gray-700 font-medium mb-2 text-sm uppercase tracking-wide">
                      {t(`contact.${field}`)}
                    </label>
                    <input
                      type={field === "email" ? "email" : "text"}
                      id={field}
                      className="w-full px-4 py-3.5 bg-gray-50 border-2 border-gray-100 rounded-xl focus:outline-none focus:border-[#1C398E] focus:bg-white transition-all duration-300 placeholder-gray-400"
                      placeholder={t(`contact.${field}`)}
                      required
                    />
                  </div>
                ))}
                <div className="relative">
                  <label htmlFor="message" className="block text-gray-700 font-medium mb-2 text-sm uppercase tracking-wide">{t("contact.message")}</label>
                  <textarea
                    id="message"
                    rows={5}
                    className="w-full px-4 py-3.5 bg-gray-50 border-2 border-gray-100 rounded-xl focus:outline-none focus:border-[#1C398E] focus:bg-white transition-all duration-300 placeholder-gray-400 resize-none"
                    placeholder={t("contact.messagePlaceholder")}
                    required
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full bg-[#1C398E] hover:bg-[#152a68] text-white py-4 rounded-xl font-semibold transition-all duration-300 transform hover:translate-y-[-2px] hover:shadow-lg mb-8"
                >
                  {t("contact.sendMessage")}
                </button>
              </form>

              {/* Section Réseaux Sociaux */}
              <div className="border-t border-gray-100 pt-8">
                <h4 className="text-xl font-bold text-[#1C398E] mb-6 text-center">{t("contact.followUs")}</h4>
                <div className="flex justify-center space-x-4">
                  <a href="#" className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-50 hover:bg-[#1C398E]/5 text-[#1C398E] transition-all duration-300 hover:scale-110">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </a>
                  <a href="#" className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-50 hover:bg-[#1C398E]/5 text-[#1C398E] transition-all duration-300 hover:scale-110">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                    </svg>
                  </a>
                  <a href="#" className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-50 hover:bg-[#1C398E]/5 text-[#1C398E] transition-all duration-300 hover:scale-110">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.897 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.897-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z"/>
                    </svg>
                  </a>
                  <a href="#" className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-50 hover:bg-[#1C398E]/5 text-[#1C398E] transition-all duration-300 hover:scale-110">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            {/* Bloc droit */}
            <div className="space-y-8">
              {/* Informations de contact */}
              <div className="bg-white p-8 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 group">
                <h3 className="text-[30px] font-bold text-[#1C398E] mb-8 text-center md:text-left">{t("contact.infoTitle")}</h3>
                <div className="space-y-8">
                  {[
                    {
                      icon: <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />,
                      title: t("contact.address"),
                      text: t("contact.addressDetails"),
                    },
                    {
                      icon: <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />,
                      title: t("contact.phone"),
                      text: "08 08 55 86 90 - 0661 680 893",
                    },
                    {
                      icon: <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />,
                      title: t("contact.emailLabel"),
                      text: "contact@associationnajm.ma",
                    },
                  ].map(({ icon, title, text }, i) => (
                    <div className="flex items-start group/item hover:bg-gray-50 p-4 rounded-2xl transition-all duration-300" key={i}>
                      <div className="flex-shrink-0 bg-[#1C398E]/10 p-4 rounded-2xl mr-5 group-hover/item:bg-[#1C398E]/20 transition-all duration-300">
                        <svg className="w-7 h-7 text-[#1C398E]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          {icon}
                        </svg>
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-[#1C398E] mb-1">{title}</h4>
                        <p className="text-gray-600 leading-relaxed">{text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Heures d'ouverture */}
              <div className="bg-white p-8 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
                <h3 className="text-[30px] font-bold text-[#1C398E] mb-8 text-center md:text-left">{t("contact.hoursTitle")}</h3>
                <ul className="space-y-6">
                  <li className="flex justify-between items-center pb-6 border-b border-gray-100 group hover:border-[#1C398E] transition-all duration-300">
                    <span className="text-gray-600 font-medium group-hover:text-[#1C398E]">{t("contact.mondayFriday")}:</span>
                    <span className="text-[#1C398E] font-bold bg-[#1C398E]/5 px-4 py-2 rounded-xl">9h00 - 17h00</span>
                  </li>
                  <li className="flex justify-between items-center pb-6 border-b border-gray-100 group hover:border-[#1C398E] transition-all duration-300">
                    <span className="text-gray-600 font-medium group-hover:text-[#1C398E]">{t("contact.saturday")}:</span>
                    <span className="text-[#1C398E] font-bold bg-[#1C398E]/5 px-4 py-2 rounded-xl">9h00 - 13h00</span>
                  </li>
                  <li className="flex justify-between items-center group">
                    <span className="text-gray-600 font-medium group-hover:text-[#1C398E]">{t("contact.sunday")}:</span>
                    <span className="text-[#1C398E] font-bold bg-[#1C398E]/5 px-4 py-2 rounded-xl">{t("contact.closed")}</span>
                  </li>
                </ul>
              </div>


            </div>
          </div>
        </div>
      </section>
      {/* <SupportedEnterprisesMap /> */}
    </>
  );
}
