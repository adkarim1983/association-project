export default function ArticleItem({ article, onEdit, onDelete }) {
  return (
    <div className="border rounded p-4 shadow-sm bg-white">
      <h3 className="text-lg font-bold">{article.title}</h3>

      {article.image && (
        <img
          src={article.image}
          alt={article.title}
          className="w-full h-48 object-cover mt-2 mb-2"
        />
      )}

      {article.video && (
        <video controls className="w-full mt-2 mb-2">
          <source src={article.video} type="video/mp4" />
          Votre navigateur ne supporte pas les vidéos.
        </video>
      )}

      <p>{article.paragraph}</p>

      <div className="mt-4 flex gap-2">
        <button
          onClick={() => onEdit(article)}
          className="bg-yellow-500 text-white px-3 py-1 rounded"
        >
          ✏️ Modifier
        </button>
        <button
          onClick={() => onDelete(article.id)}
          className="bg-red-600 text-white px-3 py-1 rounded"
        >
          🗑️ Supprimer
        </button>
      </div>
    </div>
  );
}
