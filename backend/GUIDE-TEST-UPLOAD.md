# Guide de Test - Système d'Upload d'Images

## 🎯 Objectif
Ce guide vous explique comment tester le système d'upload d'images du backend de l'Association Najm.

## 📋 Prérequis

### 1. Serveur Backend Démarré
```bash
cd backend
npm start
```
Le serveur doit être accessible sur `http://localhost:5000`

### 2. Base de Données
- MongoDB doit être démarré
- Utilisateurs admin créés (via `npm run seed-admin`)

### 3. Dépendances de Test
```bash
npm install --save-dev form-data node-fetch
```

## 🧪 Tests Automatisés

### Lancer tous les tests d'upload
```bash
npm run test-upload
```

### Tests inclus :
1. **Upload d'images pour projets** - Multiple images avec métadonnées
2. **Upload d'avatar utilisateur** - Image unique avec redimensionnement
3. **Upload pour galerie** - Multiple images avec catégories
4. **Statistiques d'upload** - Récupération des métriques
5. **Validation des fichiers** - Test de rejet des fichiers invalides
6. **Vérification des dossiers** - Structure des répertoires d'upload

## 🔧 Tests Manuels avec Postman

### 1. Authentification
```http
POST http://localhost:5000/api/auth/login
Content-Type: application/json

{
  "email": "admin@associationnajm.ma",
  "password": "Admin123!"
}
```
**Récupérer le token** de la réponse pour les tests suivants.

### 2. Upload d'Images pour Projet
```http
POST http://localhost:5000/api/upload/projects
Authorization: Bearer YOUR_TOKEN
Content-Type: multipart/form-data

Form Data:
- images: [Fichier image 1]
- images: [Fichier image 2]
- alt: "Description de l'image"
- isMain: true
```

### 3. Upload d'Avatar Utilisateur
```http
POST http://localhost:5000/api/upload/users
Authorization: Bearer YOUR_TOKEN
Content-Type: multipart/form-data

Form Data:
- avatar: [Fichier image]
```

### 4. Upload pour Galerie
```http
POST http://localhost:5000/api/upload/gallery
Authorization: Bearer YOUR_TOKEN
Content-Type: multipart/form-data

Form Data:
- images: [Fichier image 1]
- images: [Fichier image 2]
- category: "events"
- description: "Images de l'événement"
```

### 5. Statistiques d'Upload
```http
GET http://localhost:5000/api/upload/stats
Authorization: Bearer YOUR_TOKEN
```

### 6. Lister Images d'un Projet
```http
GET http://localhost:5000/api/upload/projects/PROJECT_ID/images
Authorization: Bearer YOUR_TOKEN
```

### 7. Supprimer une Image
```http
DELETE http://localhost:5000/api/upload/projects/PROJECT_ID/images/IMAGE_ID
Authorization: Bearer YOUR_TOKEN
```

## 📁 Structure des Dossiers d'Upload

```
backend/
└── uploads/
    ├── projects/        # Images des projets
    │   ├── original/    # Images originales
    │   ├── large/       # Images redimensionnées (800px)
    │   ├── medium/      # Images redimensionnées (400px)
    │   └── thumb/       # Miniatures (150px)
    ├── users/           # Avatars utilisateurs
    │   ├── original/
    │   ├── large/       # 300x300px
    │   └── thumb/       # 100x100px
    ├── gallery/         # Images de galerie
    │   ├── original/
    │   ├── large/       # 1200px
    │   ├── medium/      # 600px
    │   └── thumb/       # 200px
    └── temp/            # Fichiers temporaires
```

## 🔍 Validation des Fichiers

### Formats Acceptés
- JPEG (.jpg, .jpeg)
- PNG (.png)
- GIF (.gif)
- WebP (.webp)

### Limites
- **Taille maximale** : 5 MB par fichier
- **Nombre maximum** : 5 images par upload (projets/galerie)
- **Avatar** : 1 seule image

### Redimensionnement Automatique
- **Projets** : Original, 800px, 400px, 150px
- **Utilisateurs** : Original, 300x300px, 100x100px
- **Galerie** : Original, 1200px, 600px, 200px

## 🛡️ Sécurité

### Authentification Requise
- Tous les endpoints d'upload nécessitent un token JWT valide
- Vérification des rôles pour certaines actions

### Validation
- Type MIME vérifié
- Extension de fichier validée
- Taille de fichier contrôlée
- Noms de fichiers sécurisés (UUID)

## 📊 Réponses API

### Upload Réussi
```json
{
  "success": true,
  "message": "Images uploadées avec succès",
  "data": {
    "uploadedImages": [
      {
        "id": "uuid",
        "filename": "uuid.jpg",
        "originalName": "image.jpg",
        "url": "/uploads/projects/large/uuid.jpg",
        "size": 1024576,
        "alt": "Description",
        "isMain": true,
        "uploadedAt": "2024-01-01T00:00:00.000Z",
        "uploadedBy": "user_id"
      }
    ]
  }
}
```

### Erreur de Validation
```json
{
  "success": false,
  "message": "Type de fichier non autorisé",
  "error": "INVALID_FILE_TYPE"
}
```

## 🚀 Tests de Performance

### Métriques à Vérifier
1. **Temps d'upload** - < 5 secondes pour 5 images
2. **Redimensionnement** - < 2 secondes par image
3. **Stockage** - Compression efficace
4. **Mémoire** - Pas de fuite mémoire

### Commandes de Test
```bash
# Test de charge (optionnel)
npm run test-upload-load

# Monitoring des ressources
npm run test-upload-performance
```

## 🔧 Dépannage

### Erreurs Communes

#### "Serveur non accessible"
- Vérifier que le serveur backend est démarré
- Vérifier le port 5000

#### "Authentification échouée"
- Vérifier les credentials admin
- Régénérer les utilisateurs : `npm run seed-admin`

#### "Dossier d'upload non trouvé"
- Les dossiers sont créés automatiquement
- Vérifier les permissions de fichiers

#### "Fichier trop volumineux"
- Limite : 5 MB par fichier
- Compresser l'image avant upload

### Logs de Débogage
```bash
# Activer les logs détaillés
DEBUG=upload:* npm start
```

## 📝 Exemples de Fichiers de Test

### Images Recommandées pour Tests
- **Petite image** : < 100 KB (test rapide)
- **Image moyenne** : 1-2 MB (test normal)
- **Grande image** : 4-5 MB (test limite)
- **Fichier invalide** : .txt, .pdf (test validation)

### Formats à Tester
- image.jpg (JPEG standard)
- image.png (PNG avec transparence)
- image.gif (GIF animé)
- image.webp (Format moderne)

---

## ✅ Checklist de Test

- [ ] Serveur backend démarré
- [ ] Base de données connectée
- [ ] Utilisateur admin créé
- [ ] Test d'authentification réussi
- [ ] Upload projet fonctionnel
- [ ] Upload avatar fonctionnel
- [ ] Upload galerie fonctionnel
- [ ] Validation des fichiers active
- [ ] Redimensionnement automatique
- [ ] Statistiques accessibles
- [ ] Suppression d'images possible
- [ ] Dossiers créés automatiquement

**🎉 Si tous les tests passent, le système d'upload est prêt pour la production !**
