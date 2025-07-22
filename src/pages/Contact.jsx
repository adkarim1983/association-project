import SupportedEnterprisesMap from "../components/SupportedEnterprisesMap";
import { useTranslation } from "react-i18next";

export default function Contact() {
  const { t } = useTranslation();

  return (
    <>
      <section id="contact" className="py-24 bg-white relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-[#155DFC]/10 rounded-full opacity-70 -mr-20 -mt-20 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-[#155DFC]/10 rounded-full opacity-70 -ml-20 -mb-20 blur-3xl"></div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center ">
            <span className="text-[#155DFC] font-semibold uppercase tracking-wider">{t("contact.stayInTouch")}</span>
            <h2 className="text-lg sm:text-xl md:text-5xl font-bold text-slate-800 mt-2 mb-4 text-center leading-tight">{t("contact.title")}</h2>
            <div className="w-24 h-1.5 bg-[#155DFC] mx-auto rounded-full mb-6"></div>
            <p className="text-slate-600 max-w-3xl mx-auto text-lg">{t("contact.paragraph")}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 mt-12">
            {/* Formulaire */}
            <div className="bg-white p-8 rounded-2xl shadow-xl">
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-slate-800 mb-6 text-center md:text-left leading-tight">{t("contact.formTitle")}</h3>
              <form>
                {["name", "email", "subject"].map((field) => (
                  <div className="mb-6" key={field}>
                    <label htmlFor={field} className="block text-slate-700 font-medium mb-2">
                      {t(`contact.${field}`)}
                    </label>
                    <input
                      type={field === "email" ? "email" : "text"}
                      id={field}
                      className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#155DFC] focus:border-transparent transition-all"
                      placeholder={t(`contact.${field}`)}
                      required
                    />
                  </div>
                ))}
                <div className="mb-6">
                  <label htmlFor="message" className="block text-slate-700 font-medium mb-2">{t("contact.message")}</label>
                  <textarea
                    id="message"
                    rows={5}
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#155DFC] focus:border-transparent transition-all"
                    placeholder={t("contact.messagePlaceholder")}
                    required
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full bg-[#155DFC] hover:bg-blue-700 text-white py-3 rounded-xl font-medium transition-colors"
                >
                  {t("contact.sendMessage")}
                </button>
              </form>
            </div>

            {/* Bloc droit */}
            <div className="space-y-8">
              {/* Informations de contact */}
              <div className="bg-white p-8 rounded-2xl shadow-xl">
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-slate-800 mb-6 text-center md:text-left leading-tight">{t("contact.infoTitle")}</h3>
                <div className="space-y-6">
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
                    <div className="flex items-start" key={i}>
                      <div className="flex-shrink-0 bg-[#155DFC]/10 p-3 rounded-full mr-4">
                        <svg className="w-6 h-6 text-[#155DFC]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          {icon}
                        </svg>
                      </div>
                      <div>
                        <h4 className="text-lg font-medium text-slate-800">{title}</h4>
                        <p className="text-slate-600">{text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Heures d'ouverture */}
              <div className="bg-white p-8 rounded-2xl shadow-xl">
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-slate-800 mb-6 text-center md:text-left leading-tight">{t("contact.hoursTitle")}</h3>
                <ul className="space-y-4">
                  <li className="flex justify-between items-center pb-4 border-b border-slate-100">
                    <span className="text-slate-600 font-medium">{t("contact.mondayFriday")}:</span>
                    <span className="text-[#155DFC] font-bold">9h00 - 17h00</span>
                  </li>
                  <li className="flex justify-between items-center pb-4 border-b border-slate-100">
                    <span className="text-slate-600 font-medium">{t("contact.saturday")}:</span>
                    <span className="text-[#155DFC] font-bold">9h00 - 13h00</span>
                  </li>
                  <li className="flex justify-between items-center">
                    <span className="text-slate-600 font-medium">{t("contact.sunday")}:</span>
                    <span className="text-[#155DFC] font-bold">{t("contact.closed")}</span>
                  </li>
                </ul>
              </div>

              {/* Réseaux sociaux */}
              <div className="bg-[#155DFC] p-8 rounded-2xl shadow-xl text-white">
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-4 text-center md:text-left leading-tight">{t("contact.followUs")}</h3>
                <p className="mb-6">{t("contact.socialText")}</p>
                {/* Tes icônes sont déjà parfaites */}
                {/* ... */}
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <SupportedEnterprisesMap /> */}
    </>
  );
}
