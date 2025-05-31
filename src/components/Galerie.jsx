import React from "react";

function Galerie() {
  const images = [
    "https://associationnajm.ma/wp-content/uploads/2024/12/qq5.jpg",
    "https://associationnajm.ma/wp-content/uploads/2024/12/%E5%9B%BE%E7%89%875-1200x650.jpg",
    "https://associationnajm.ma/wp-content/uploads/2024/12/ww1-976x650.jpg",
  ];

  return (
    <section className="py-16 px-6 bg-white text-center">
      <h2 className="text-3xl font-bold text-gray-800 mb-12">Nos activités en images test</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {images.map((img, i) => (
          <img
            key={i}
            src={img}
            alt={`Activité ${i + 1}`}
            className="rounded-lg shadow-md hover:scale-105 transition-transform duration-500 object-cover h-64 w-full"
          />
        ))}
      </div>
    </section>
  );
}

export default Galerie;
