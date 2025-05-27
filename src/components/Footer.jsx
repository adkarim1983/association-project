import React from "react";
import logo from "../assets/logo.png";

function Footer() {
    return (
        <footer className="bg-gray-900 text-white pt-12 px-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
                <div>
                    <img src={logo} alt="Logo Najm" className="w-24 mb-4 mx-auto sm:mx-0" />
                    <p className="text-sm text-center sm:text-left">
                        L’Association Najm pour le développement culturel et éducatif œuvre à promouvoir l’engagement des jeunes à travers des actions citoyennes et éducatives.
                    </p>
                </div>

                {/* Nos Valeurs */}
                <div>
                    <h3 className="text-lg font-semibold mb-3 text-center sm:text-left">Nos valeurs</h3>
                    <ul className="space-y-2 text-sm text-center sm:text-left">
                        <li>🤝 Solidarité</li>
                        <li>🌍 Citoyenneté</li>
                        <li>📚 Éducation</li>
                        <li>🎨 Culture</li>
                    </ul>
                </div>

                {/* Galerie */}
                <div>
                    <h3 className="text-lg font-semibold mb-3 text-center sm:text-left">Galerie</h3>
                    <div className="grid grid-cols-3 gap-2">
                        <img src="https://associationnajm.ma/assets/img/events/ev1.jpg" alt="activité" className="w-full h-16 object-cover rounded" />
                        <img src="https://associationnajm.ma/assets/img/events/ev2.jpg" alt="activité" className="w-full h-16 object-cover rounded" />
                        <img src="https://associationnajm.ma/assets/img/events/ev3.jpg" alt="activité" className="w-full h-16 object-cover rounded" />
                    </div>
                </div>

                {/* Réseaux sociaux */}
                <div>
                    <h3 className="text-lg font-semibold mb-3 text-center sm:text-left">Suivez-nous</h3>
                    <div className="flex justify-center sm:justify-start gap-4 text-white text-2xl">
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                            <svg className="w-6 h-6 hover:text-blue-500" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.877v-6.987H7.898v-2.89h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.242 0-1.63.771-1.63 1.562v1.875h2.773l-.443 2.89h-2.33v6.987C18.343 21.128 22 16.991 22 12z" />
                            </svg>
                        </a>
                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                            <svg className="w-6 h-6 hover:text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M22.46 6c-.77.35-1.6.58-2.46.69a4.3 4.3 0 001.88-2.37 8.59 8.59 0 01-2.72 1.03 4.28 4.28 0 00-7.29 3.9A12.14 12.14 0 013 4.8a4.28 4.28 0 001.33 5.71 4.26 4.26 0 01-1.94-.54v.05a4.29 4.29 0 003.43 4.2 4.28 4.28 0 01-1.93.07 4.29 4.29 0 004 2.96A8.58 8.58 0 012 19.54 12.1 12.1 0 008.29 21c7.55 0 11.68-6.26 11.68-11.68 0-.18 0-.35-.01-.53A8.36 8.36 0 0022.46 6z" />
                            </svg>
                        </a>
                        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                            <svg className="w-6 h-6 hover:text-blue-700" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11.75 20h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.783-1.75-1.75s.784-1.75 1.75-1.75 1.75.784 1.75 1.75-.784 1.75-1.75 1.75zm13.25 12.268h-3v-5.5c0-1.381-.028-3.157-1.922-3.157-1.922 0-2.218 1.5-2.218 3.05v5.607h-3v-11h2.887v1.507h.041c.402-.762 1.381-1.566 2.844-1.566 3.043 0 3.605 2.002 3.605 4.604v6.455z" />
                            </svg>
                        </a>
                    </div>
                </div>
            </div>

            {/* Bas de page */}
            <div className="mt-10 border-t border-gray-700 pt-4 text-center text-sm text-gray-400">
                © 2025 Association Najm. Tous droits réservés.
            </div>
        </footer>
    );
}

export default Footer;
