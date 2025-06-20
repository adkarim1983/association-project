import { useState } from 'react';
import ArticleForm from './ArticleForm';
import ArticleList from './ArticleList';

export default function Dashboard() {
  const [view, setView] = useState('list');
  const [articles, setArticles] = useState([]);
  const [articleToEdit, setArticleToEdit] = useState(null);

  const handleAddArticle = (newArticle) => {
    if (articleToEdit) {
      // modification
      setArticles((prev) =>
        prev.map((article) =>
          article.id === articleToEdit.id ? { ...newArticle, id: article.id } : article
        )
      );
      setArticleToEdit(null);
    } else {
      // ajout
      setArticles((prev) => [...prev, { ...newArticle, id: Date.now() }]);
    }
    setView('list');
  };

  const handleEditArticle = (article) => {
    setArticleToEdit(article);
    setView('form');
  };

  const handleDeleteArticle = (id) => {
    setArticles((prev) => prev.filter((a) => a.id !== id));
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">🛠️ Tableau de bord</h1>

      <div className="flex gap-4 mb-4">
        <button
          onClick={() => {
            setArticleToEdit(null);
            setView('form');
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          ➕ Ajouter un article
        </button>
        <button
          onClick={() => setView('list')}
          className="bg-gray-600 text-white px-4 py-2 rounded"
        >
          📄 Voir les articles
        </button>
      </div>

      <div className="mt-4">
        {view === 'form' && (
          <ArticleForm
            onAddArticle={handleAddArticle}
            articleToEdit={articleToEdit}
          />
        )}
        {view === 'list' && (
          <ArticleList
            articles={articles}
            onEdit={handleEditArticle}
            onDelete={handleDeleteArticle}
          />
        )}
      </div>
    </div>
  );
}
