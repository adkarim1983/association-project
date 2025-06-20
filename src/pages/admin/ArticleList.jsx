import ArticleItem from './ArticleItem';

export default function ArticleList({ articles, onEdit, onDelete }) {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Liste des articles</h2>
      <div className="grid gap-4">
        {articles.length === 0 ? (
          <p className="text-gray-500">Aucun article pour le moment.</p>
        ) : (
          articles.map((article) => (
            <ArticleItem
              key={article.id}
              article={article}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))
        )}
      </div>
    </div>
  );
}
