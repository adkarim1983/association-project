import { useTranslation } from "react-i18next";

export default function ListingLocationPage() {
  const { t } = useTranslation();
  
  return (
    <section className="py-20 px-6 text-center">
      <h1 className="text-4xl font-bold text-blue-700 mb-6 whitespace-pre-line">
        {t("projects.title")}
      </h1>
      <p className="text-lg text-gray-600">
        Cette page contiendra la liste des projets disponibles avec filtres et cartes. 🔍📍
      </p>
    </section>
  );
}
