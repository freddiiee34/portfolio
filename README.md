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

## Animation de l'ouverture

Le fond bleu derrière le nom est un shader WebGL écrit à la main (bruit fractal déformé par lui-même, « domain warping »), dans le dernier script de `site/index.html`. Il ralentit l'image hors écran, se fige si le visiteur a demandé moins d'animations, et laisse un dégradé fixe si WebGL est indisponible.

## Formulaire de contact

Le formulaire du bas de page envoie un JSON à `https://n8n.simondelrue.fr/webhook/portfolio-contact`.
Le workflow n8n « Portfolio · Contact » (`n8n/portfolio-contact.json`, code dans `n8n/verifier_message.js`) vérifie le message
(champ piège anti-robot, nom, email, longueur), puis l'envoie par Brevo à sdelruepro@gmail.com avec l'adresse du visiteur en « Répondre à ».
Rien n'est conservé : les exécutions réussies ne sont pas enregistrées dans n8n.
