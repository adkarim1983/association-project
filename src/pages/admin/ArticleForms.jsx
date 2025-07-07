import { useState } from 'react';
import axios from 'axios';

export default function ArticleForms() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('http://localhost:3000/articles', {
        title,
        content
      });
      setMessage('✅ Article créé avec succès !');
      setTitle('');
      setContent('');
    } catch (err) {
      setMessage('❌ Erreur lors de la création.');
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto bg-white shadow rounded">
      <h2 className="text-xl font-bold mb-4">Créer un Article</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Titre"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border w-full mb-3 p-2 rounded"
          required
        />
        <textarea
          placeholder="Contenu"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="border w-full mb-3 p-2 rounded"
          rows="5"
          required
        ></textarea>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Enregistrer
        </button>
      </form>
      {message && <p className="mt-3">{message}</p>}
    </div>
  );
}
