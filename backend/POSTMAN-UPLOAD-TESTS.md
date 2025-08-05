# Guide de Test Postman - Upload d'Images

## 🎯 Tests du Système d'Upload avec Postman

### Prérequis
1. **Serveur Backend** démarré sur `http://localhost:5000`
2. **MongoDB** connecté
3. **Utilisateur admin** créé (via `npm run seed-admin`)

---

## 📋 Collection Postman - Tests d'Upload

### 1. **Authentification Admin**
```http
POST http://localhost:5000/api/auth/login
Content-Type: application/json

Body (raw JSON):
{
  "email": "admin@associationnajm.ma",
  "password": "Admin123!"
}
```

**Réponse attendue :**
```json
{
  "success": true,
  "data": {
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": "...",
      "name": "Admin User",
      "email": "admin@associationnajm.ma",
      "role": "admin"
    }
  }
}
```

**➡️ Copier le `accessToken` pour les tests suivants**

---

### 2. **Upload d'Images pour Projet**
```http
POST http://localhost:5000/api/upload/projects
Authorization: Bearer YOUR_ACCESS_TOKEN
Content-Type: multipart/form-data

Form Data:
- images: [Sélectionner fichier image 1]
- images: [Sélectionner fichier image 2] (optionnel)
- alt: "Description de l'image du projet"
- isMain: true
```

**Réponse attendue :**
```json
{
  "success": true,
  "message": "Images uploadées avec succès",
  "data": {
    "uploadedImages": [
      {
        "id": "uuid-generated",
        "filename": "uuid.jpg",
        "originalName": "mon-image.jpg",
        "url": "/uploads/projects/large/uuid.jpg",
        "size": 1024576,
        "alt": "Description de l'image du projet",
        "isMain": true,
        "uploadedAt": "2024-01-01T00:00:00.000Z",
        "uploadedBy": "admin-user-id"
      }
    ]
  }
}
```

---

### 3. **Upload d'Avatar Utilisateur**
```http
POST http://localhost:5000/api/upload/users
Authorization: Bearer YOUR_ACCESS_TOKEN
Content-Type: multipart/form-data

Form Data:
- avatar: [Sélectionner fichier image]
```

**Réponse attendue :**
```json
{
  "success": true,
  "message": "Avatar uploadé avec succès",
  "data": {
    "filename": "uuid.jpg",
    "originalName": "avatar.jpg",
    "url": "/uploads/users/large/uuid.jpg",
    "size": 512000,
    "uploadedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

---

### 4. **Upload pour Galerie**
```http
POST http://localhost:5000/api/upload/gallery
Authorization: Bearer YOUR_ACCESS_TOKEN
Content-Type: multipart/form-data

Form Data:
- images: [Sélectionner fichier image 1]
- images: [Sélectionner fichier image 2]
- category: "events"
- description: "Images de l'événement de charité"
```

**Réponse attendue :**
```json
{
  "success": true,
  "message": "Images de galerie uploadées avec succès",
  "data": {
    "uploadedImages": [
      {
        "id": "uuid-1",
        "filename": "uuid-1.jpg",
        "originalName": "event-1.jpg",
        "url": "/uploads/gallery/large/uuid-1.jpg",
        "category": "events",
        "description": "Images de l'événement de charité",
        "size": 2048000,
        "uploadedAt": "2024-01-01T00:00:00.000Z"
      }
    ]
  }
}
```

---

### 5. **Statistiques d'Upload**
```http
GET http://localhost:5000/api/upload/stats
Authorization: Bearer YOUR_ACCESS_TOKEN
```

**Réponse attendue :**
```json
{
  "success": true,
  "data": {
    "totalFiles": 15,
    "totalSize": 52428800,
    "projectImages": 8,
    "userAvatars": 3,
    "galleryImages": 4,
    "byCategory": {
      "projects": 8,
      "users": 3,
      "gallery": 4
    },
    "recentUploads": [
      {
        "filename": "uuid.jpg",
        "category": "projects",
        "uploadedAt": "2024-01-01T00:00:00.000Z"
      }
    ]
  }
}
```

---

### 6. **Lister Images d'un Projet**
```http
GET http://localhost:5000/api/upload/projects/PROJECT_ID/images
Authorization: Bearer YOUR_ACCESS_TOKEN
```

**Réponse attendue :**
```json
{
  "success": true,
  "data": {
    "projectId": "PROJECT_ID",
    "images": [
      {
        "id": "image-id",
        "filename": "uuid.jpg",
        "url": "/uploads/projects/large/uuid.jpg",
        "alt": "Description",
        "isMain": true,
        "size": 1024576,
        "uploadedAt": "2024-01-01T00:00:00.000Z"
      }
    ]
  }
}
```

---

### 7. **Supprimer une Image**
```http
DELETE http://localhost:5000/api/upload/projects/PROJECT_ID/images/IMAGE_ID
Authorization: Bearer YOUR_ACCESS_TOKEN
```

**Réponse attendue :**
```json
{
  "success": true,
  "message": "Image supprimée avec succès",
  "data": {
    "deletedImage": {
      "id": "IMAGE_ID",
      "filename": "uuid.jpg"
    }
  }
}
```

---

## 🧪 Tests de Validation

### Test 1: Fichier Non-Image
```http
POST http://localhost:5000/api/upload/projects
Authorization: Bearer YOUR_ACCESS_TOKEN
Content-Type: multipart/form-data

Form Data:
- images: [Fichier .txt ou .pdf]
```

**Réponse attendue (Erreur) :**
```json
{
  "success": false,
  "message": "Type de fichier non autorisé. Seules les images sont acceptées.",
  "error": "INVALID_FILE_TYPE"
}
```

### Test 2: Fichier Trop Volumineux
```http
POST http://localhost:5000/api/upload/projects
Authorization: Bearer YOUR_ACCESS_TOKEN
Content-Type: multipart/form-data

Form Data:
- images: [Fichier > 5MB]
```

**Réponse attendue (Erreur) :**
```json
{
  "success": false,
  "message": "Fichier trop volumineux. Taille maximale: 5MB",
  "error": "FILE_TOO_LARGE"
}
```

### Test 3: Trop d'Images
```http
POST http://localhost:5000/api/upload/projects
Authorization: Bearer YOUR_ACCESS_TOKEN
Content-Type: multipart/form-data

Form Data:
- images: [6 fichiers images]
```

**Réponse attendue (Erreur) :**
```json
{
  "success": false,
  "message": "Nombre maximum d'images dépassé. Maximum: 5 images",
  "error": "TOO_MANY_FILES"
}
```

### Test 4: Sans Authentification
```http
POST http://localhost:5000/api/upload/projects
Content-Type: multipart/form-data

Form Data:
- images: [Fichier image]
```

**Réponse attendue (Erreur) :**
```json
{
  "success": false,
  "message": "Token d'authentification requis",
  "error": "AUTHENTICATION_REQUIRED"
}
```

---

## 📁 Vérification des Fichiers Uploadés

### Structure des Dossiers
Après upload réussi, vérifier que les fichiers sont créés dans :

```
backend/uploads/
├── projects/
│   ├── original/     # Images originales
│   ├── large/        # 800px de largeur
│   ├── medium/       # 400px de largeur
│   └── thumb/        # 150px de largeur
├── users/
│   ├── original/
│   ├── large/        # 300x300px
│   └── thumb/        # 100x100px
└── gallery/
    ├── original/
    ├── large/        # 1200px de largeur
    ├── medium/       # 600px de largeur
    └── thumb/        # 200px de largeur
```

### Accès aux Images
Les images uploadées sont accessibles via :
```
http://localhost:5000/uploads/projects/large/uuid.jpg
http://localhost:5000/uploads/users/thumb/uuid.jpg
http://localhost:5000/uploads/gallery/medium/uuid.jpg
```

---

## ✅ Checklist de Test

- [ ] Authentification admin réussie
- [ ] Upload images projet (1 image)
- [ ] Upload images projet (multiple images)
- [ ] Upload avatar utilisateur
- [ ] Upload galerie (multiple images)
- [ ] Récupération des statistiques
- [ ] Liste des images d'un projet
- [ ] Suppression d'une image
- [ ] Validation : fichier non-image rejeté
- [ ] Validation : fichier trop volumineux rejeté
- [ ] Validation : trop d'images rejeté
- [ ] Validation : sans authentification rejeté
- [ ] Vérification des fichiers créés sur disque
- [ ] Accès aux images via URL statique

---

## 🚀 Résultats Attendus

Si tous les tests passent :
- ✅ **Authentification** : Système JWT fonctionnel
- ✅ **Upload** : Images uploadées et redimensionnées
- ✅ **Validation** : Fichiers invalides rejetés
- ✅ **Stockage** : Structure de dossiers créée
- ✅ **Sécurité** : Accès protégé par authentification
- ✅ **Performance** : Redimensionnement automatique

**🎉 Le système d'upload d'images est prêt pour la production !**
