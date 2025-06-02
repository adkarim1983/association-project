import SupportedEnterprisesMap from "../components/SupportedEnterprisesMap";
export default function Contact() {
  return (
    <>
      <section id="contact" className="py-24 bg-white relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-[#155DFC]/10 rounded-full opacity-70 -mr-20 -mt-20 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-[#155DFC]/10 rounded-full opacity-70 -ml-20 -mb-20 blur-3xl"></div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <span className="text-[#155DFC] font-semibold uppercase tracking-wider">Restons en contact</span>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mt-2 mb-4">Contactez-nous</h2>
            <div className="w-24 h-1.5 bg-[#155DFC] mx-auto rounded-full mb-6"></div>
            <p className="text-slate-600 max-w-3xl mx-auto text-lg">
              Vous avez des questions ou souhaitez en savoir plus sur nos activités ? N'hésitez pas à nous contacter. Nous
              serons ravis de vous répondre.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-white p-8 rounded-2xl shadow-xl">
              <h3 className="text-2xl font-bold text-slate-800 mb-6">Envoyez-nous un message</h3>
              <form>
                {/* Form Fields */}
                {["name", "email", "subject"].map((field) => (
                  <div className="mb-6" key={field}>
                    <label htmlFor={field} className="block text-slate-700 font-medium mb-2">
                      {field === "name" && "Nom complet"}
                      {field === "email" && "Email"}
                      {field === "subject" && "Sujet"}
                    </label>
                    <input
                      type={field === "email" ? "email" : "text"}
                      id={field}
                      className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#155DFC] focus:border-transparent transition-all"
                      placeholder={`Votre ${field === "name" ? "nom" : field}`}
                      required
                    />
                  </div>
                ))}
                <div className="mb-6">
                  <label htmlFor="message" className="block text-slate-700 font-medium mb-2">Message</label>
                  <textarea
                    id="message"
                    rows={5}
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#155DFC] focus:border-transparent transition-all"
                    placeholder="Votre message"
                    required
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full bg-[#155DFC] hover:bg-blue-700 text-white py-3 rounded-xl font-medium transition-colors"
                >
                  Envoyer le message
                </button>
              </form>
            </div>

            <div className="space-y-8">
              {/* Informations de contact */}
              <div className="bg-white p-8 rounded-2xl shadow-xl">
                <h3 className="text-2xl font-bold text-slate-800 mb-6">Informations de contact</h3>
                <div className="space-y-6">
                  {[
                    {
                      icon: (
                        <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      ),
                      title: "Adresse",
                      text: "Groupe 3, en face de la Faculté des Lettres et des Sciences Humaines Ben M’sik,",
                    },
                    {
                      icon: (
                        <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      ),
                      title: "Téléphone",
                      text: " 08 08 55 86 90 - 0661 680 893",
                    },
                    {
                      icon: (
                        <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      ),
                      title: "Email",
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
                <h3 className="text-2xl font-bold text-slate-800 mb-6">Heures d'ouverture</h3>
                <ul className="space-y-4">
                  <li className="flex justify-between items-center pb-4 border-b border-slate-100">
                    <span className="text-slate-600 font-medium">Lundi - Vendredi:</span>
                    <span className="text-[#155DFC] font-bold">9h00 - 17h00</span>
                  </li>
                  <li className="flex justify-between items-center pb-4 border-b border-slate-100">
                    <span className="text-slate-600 font-medium">Samedi:</span>
                    <span className="text-[#155DFC] font-bold">9h00 - 13h00</span>
                  </li>
                  <li className="flex justify-between items-center">
                    <span className="text-slate-600 font-medium">Dimanche:</span>
                    <span className="text-[#155DFC] font-bold">Fermé</span>
                  </li>
                </ul>
              </div>

              {/* Réseaux sociaux */}
              <div className="bg-[#155DFC] p-8 rounded-2xl shadow-xl text-white">
                <h3 className="text-2xl font-bold mb-4">Suivez-nous</h3>
                <p className="mb-6">
                  Restez connectés avec nous sur les réseaux sociaux pour suivre nos activités et nos actualités.
                </p>
                <div className="flex space-x-4">
                  {["facebook", "twitter", "instagram", "youtube"].map((platform, i) => (
                    <a
                      href="https://www.facebook.com/"
                      key={i}
                      className="bg-white/20 hover:bg-white/30 h-10 w-10 rounded-full flex items-center justify-center transition-colors"
                      aria-label={platform}
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        {platform === "facebook" && (
                          <path d="M18.77,7.46H14.5v-1.9c0-.9.6-1.1,1-1.1h3V.5L14.17.5C10.24.5,9.5,3.44,9.5,5.32v2.15h-3v4h3v12h5v-12h3.85l.42-4Z" />
                        )}
                        {platform === "twitter" && (
                          <path d="M23.44,4.83c-.8.37-1.5.38-2.22.02.93-.56.98-.96,1.32-2.02-.88.52-1.86.9-2.9,1.1-.82-.88-2-1.43-3.3-1.43-2.5,0-4.55,2.04-4.55,4.54,0,.36.03.7.1,1.04-3.77-.2-7.12-2-9.36-4.75-.4.67-.6,1.45-.6,2.3,0,1.56.8,2.95,2,3.77-.74-.03-1.44-.23-2.05-.57v.06c0,2.2,1.56,4.03,3.64,4.44-.67.2-1.37.2-2.06.08.58,1.8,2.26,3.12,4.25,3.16C5.78,18.1,3.37,18.74,1,18.46c2,1.3,4.4,2.04,6.97,2.04,8.35,0,12.92-6.92,12.92-12.93,0-.2,0-.4-.02-.6.9-.63,1.96-1.22,2.56-2.14Z" />
                        )}
                        {platform === "instagram" && (
                          <path d="M12,2.16c3.2,0,3.58,0,4.85.07,3.25.15,4.77,1.69,4.92,4.92.06,1.27.07,1.65.07,4.85,0,3.2,0,3.58-.07,4.85-.15,3.23-1.66,4.77-4.92,4.92-1.27.06-1.64.07-4.85.07-3.2,0-3.58,0-4.85-.07-3.26-.15-4.77-1.7-4.92-4.92-.06-1.27-.07-1.64-.07-4.85,0-3.2,0-3.58.07-4.85C2.38,3.92,3.9,2.38,7.15,2.23,8.42,2.18,8.8,2.16,12,2.16ZM12,0C8.74,0,8.33,0,7.05.07c-4.35.2-6.78,2.62-6.98,6.98C0,8.33,0,8.74,0,12S0,15.67.07,16.95c.2,4.36,2.63,6.78,6.98,6.98C8.33,24,8.74,24,12,24s3.67,0,4.95-.07c4.35-.2,6.78-2.62,6.98-6.98C24,15.67,24,15.26,24,12s0-3.67-.07-4.95c-.2-4.35-2.63-6.78-6.98-6.98C15.67,0,15.26,0,12,0Zm0,5.84A6.16,6.16,0,1,0,18.16,12,6.16,6.16,0,0,0,12,5.84ZM18.41,4.15a1.44,1.44,0,1,0,1.43,1.44A1.44,1.44,0,0,0,18.41,4.15Z" />
                        )}
                        {platform === "youtube" && (
                          <path d="M23.5,6.19a3.02,3.02,0,0,0-2.12-2.12C19.54,3.5,12,3.5,12,3.5s-7.54,0-9.38.56A3.02,3.02,0,0,0,.5,6.19C0,8.03,0,12,0,12s0,3.97.5,5.81a3.02,3.02,0,0,0,2.12,2.12C4.46,20.5,12,20.5,12,20.5s7.54,0,9.38-.56a3.02,3.02,0,0,0,2.12-2.12C24,15.97,24,12,24,12S24,8.03,23.5,6.19ZM9.54,15.5V8.5L15.84,12Z" />
                        )}

                      </svg>
                      <path d="M23.5,6.19a3.02,3.02,0,0,0-2.12-2.12C19.54,3.5,12,3.5,12,3.5s-7.54,0-9.38.56A3.02,3.02,0,0,0,.5,6.19C0,8.03,0,12,0,12s0,3.97.5,5.81a3.02,3.02,0,0,0,2.12,2.12C4.46,20.5,12,20.5,12,20.5s7.54,0,9.38-.56a3.02,3.02,0,0,0,2.12-2.12C24,15.97,24,12,24,12S24,8.03,23.5,6.19ZM9.54,15.5V8.5L15.84,12Z" />

                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <SupportedEnterprisesMap />
    </>
  );
}
