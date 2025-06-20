import { useState, useEffect } from 'react';

export default function ArticleForm({ onAddArticle, articleToEdit }) {
  const [title, setTitle] = useState('');
  const [paragraph, setParagraph] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [videoUrl, setVideoUrl] = useState('');
  const [videoFile, setVideoFile] = useState(null);

  useEffect(() => {
    if (articleToEdit) {
      setTitle(articleToEdit.title || '');
      setParagraph(articleToEdit.paragraph || '');
      setImageUrl(articleToEdit.imageUrl || '');
      setVideoUrl(articleToEdit.videoUrl || '');
      setImageFile(null);
      setVideoFile(null);
    }
  }, [articleToEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const article = {
      id: articleToEdit ? articleToEdit.id : Date.now(),
      title,
      paragraph,
      image: imageFile ? URL.createObjectURL(imageFile) : imageUrl,
      imageUrl,
      video: videoFile ? URL.createObjectURL(videoFile) : videoUrl,
      videoUrl,
    };

    onAddArticle(article);

    // Reset
    setTitle('');
    setParagraph('');
    setImageUrl('');
    setImageFile(null);
    setVideoUrl('');
    setVideoFile(null);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 bg-white p-6 rounded shadow-md"
    >
      <h2 className="text-2xl font-semibold mb-4">
        {articleToEdit ? '✏️ Modifier un article' : '➕ Ajouter un article'}
      </h2>

      {/* Titre */}
      <input
        type="text"
        placeholder="Titre de l’article"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border w-full p-2 rounded"
        required
      />

      {/* Paragraphe */}
      <textarea
        placeholder="Contenu de l’article"
        value={paragraph}
        onChange={(e) => setParagraph(e.target.value)}
        className="border w-full p-2 rounded"
        rows={4}
        required
      ></textarea>

      {/* IMAGE */}
      <div className="space-y-2">
        <label className="block font-medium">Image</label>

        <input
          type="text"
          placeholder="🌐 URL de l’image (facultatif)"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          className="border w-full p-2 rounded"
        />

        {/* BOUTON : Télécharger une image */}
        <div>
          <label
            htmlFor="image-upload"
            className="inline-block bg-blue-600 text-white px-4 py-2 rounded cursor-pointer"
          >
            📁 Télécharger une image
          </label>
          <input
            id="image-upload"
            type="file"
            accept="image/*"
            onChange={(e) => setImageFile(e.target.files[0])}
            className="hidden"
          />
        </div>

        {/* Aperçu de l’image */}
        {imageFile ? (
          <img
            src={URL.createObjectURL(imageFile)}
            alt="Aperçu"
            className="w-40 h-40 object-cover border mt-2"
          />
        ) : imageUrl ? (
          <img
            src={imageUrl}
            alt="Aperçu"
            className="w-40 h-40 object-cover border mt-2"
          />
        ) : null}
      </div>

      {/* VIDEO */}
      <div className="space-y-2 mt-4">
        <label className="block font-medium">Vidéo</label>

        <input
          type="text"
          placeholder="🌐 URL de la vidéo (YouTube, Vimeo, MP4...)"
          value={videoUrl}
          onChange={(e) => setVideoUrl(e.target.value)}
          className="border w-full p-2 rounded"
        />

        {/* BOUTON : Télécharger une vidéo */}
        <div>
          <label
            htmlFor="video-upload"
            className="inline-block bg-purple-600 text-white px-4 py-2 rounded cursor-pointer"
          >
            📁 Télécharger une vidéo
          </label>
          <input
            id="video-upload"
            type="file"
            accept="video/*"
            onChange={(e) => setVideoFile(e.target.files[0])}
            className="hidden"
          />
        </div>

        {/* Aperçu vidéo */}
        {videoFile ? (
          <video
            src={URL.createObjectURL(videoFile)}
            controls
            className="w-full max-w-md mt-2"
          ></video>
        ) : videoUrl ? (
          <video
            src={videoUrl}
            controls
            className="w-full max-w-md mt-2"
          ></video>
        ) : null}
      </div>

      {/* BOUTON ENREGISTRER */}
      <button
        type="submit"
        className="bg-green-600 text-white px-6 py-2 rounded font-semibold"
      >
        {articleToEdit ? '✅ Modifier' : '💾 Enregistrer'}
      </button>
    </form>
  );
}
