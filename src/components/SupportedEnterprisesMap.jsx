export default function SupportedEnterprisesMap() {
  return (
    <section className="py-20 bg-blue-50" id="map-enterprises">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-blue-900 mb-4">Carte des entreprises soutenues</h2>
          <p className="text-blue-700 max-w-2xl mx-auto text-lg">
            Découvrez les différentes entreprises qui ont bénéficié de notre soutien à travers le Royaume. Cette carte reflète l’impact de nos actions sur le terrain.
          </p>
        </div>

        
        <div className="w-full h-[450px] bg-white rounded-xl shadow-md overflow-hidden">
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

        <div className="text-center mt-8">
          <a href="#"className="inline-block bg-blue-600 text-white font-semibold px-6 py-3 rounded-full hover:bg-blue-700 transition">
            En savoir plus</a>
        </div>
      </div>
    </section>
  );
}
