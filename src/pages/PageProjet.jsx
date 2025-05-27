import { useParams } from "react-router-dom";
import projects from "../data/projects";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

export default function PageProjet() {
  const { id } = useParams();
  const project = projects.find((p) => p.id === parseInt(id));

  if (!project) {
    return <div className="text-center py-20 text-red-600">Projet introuvable.</div>;
  }

  return (
    <section className="py-16 px-6 max-w-5xl mx-auto">
      <h1 className="text-4xl font-bold text-blue-800 text-center mb-6">{project.name}</h1>

      <img
        src={project.image}
        alt={project.name}
        className="w-full h-64 object-cover rounded-lg shadow mb-8"
      />

      <div className="space-y-6 text-gray-700 leading-relaxed">
        {project.descriptionSections?.map((section, index) => (
          <div key={index}>
            <h2 className="text-2xl font-semibold text-blue-700 mb-2">{section.title}</h2>
            <p>{section.content}</p>
          </div>
        ))}
      </div>

      <div className="w-full h-[350px] mt-12 rounded-lg overflow-hidden border border-gray-200">
        <iframe
            title="Carte - Faculté des Lettres et des Sciences Humaines Ben M'sik"
            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d13314.647347481883!2d-7.5382!3d33.56227!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xda7d3f6b07b8c99%3A0x651db1e6a01f8c1b!2sFacult%C3%A9%20des%20Lettres%20et%20des%20Sciences%20Humaines%20Ben%20M'sik!5e0!3m2!1sfr!2sma!4v1716143000000!5m2!1sfr!2sma"
            width="100%"
            height="100%"
            allowFullScreen=""
            loading="lazy"
            style={{ border: 0 }}
          ></iframe>
      </div>
    </section>
  );
}
