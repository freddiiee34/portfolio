# Portfolio de Simon Delrue

Site personnel servi sur [simondelrue.fr](https://simondelrue.fr) : présentation, projets IA en ligne (Pacewell, audit de site), réalisations en agence, méthode, compétences, parcours et contact.

Pages statiques (HTML, CSS, une police auto-hébergée), sans framework, sans cookie ni outil de mesure d'audience. Une seule requête externe : les chiffres en direct de Pacewell, lus sur le workflow n8n « Statistiques » ; sans réponse, les chiffres écrits dans la page restent affichés.

## Structure

```
site/index.html            page principale
site/mentions-legales.html mentions légales
site/style.css             styles (même identité que l'audit : ardoise, accent jaune, Schibsted Grotesk)
site/img/                  portrait, captures des projets, image de partage (apercu.png)
site/fonts/                Schibsted Grotesk (woff2, graisses 400 à 900)
nginx.conf                 adresses sans .html, cache des images, redirection de www
Dockerfile                 image nginx
```

## Prévisualiser en local

```bash
cd site && python3 -m http.server 8000
```

Puis ouvrir http://localhost:8000.

## Mettre en ligne (Coolify)

1. Créer une application depuis ce dépôt : **Build Pack** Dockerfile, **Base Directory** `/`, port **80**.
2. Domaines : `https://simondelrue.fr,https://www.simondelrue.fr`.
3. Dans la zone DNS du domaine, faire pointer `simondelrue.fr` (enregistrement A, sous-domaine vide) et `www` vers l'adresse IP du VPS, en supprimant les anciens enregistrements A et AAAA de l'hébergement OVH.
4. Pour les chiffres en direct : ajouter `https://simondelrue.fr` aux origines autorisées du webhook `pacewell-stats` dans n8n.

## Mettre à jour

Modifier les fichiers de `site/`, vérifier en local, pousser : Coolify redéploie à chaque push si le déploiement automatique est activé, sinon cliquer sur **Redeploy**.
