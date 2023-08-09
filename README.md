# Mainecoorse

Made with Maple love ♥

## Description

Nest et Firebase utilisation [NESTxFIREBASE](https://reza-rahmati.medium.com/setup-nest-and-firebase-functions-in-a-new-project-631ba1435289)

Autre lien helpful : https://itnext.io/nx-nest-firebase-the-dream-616e8ee71920

## Journal de Debug GCP

https://console.cloud.google.com/welcome?authuser=0&hl=fr&project=mainecoorse
Menu > Journaux > Explorateur de journaux

Permet de voir tous logs d'erreur via GCP

A noter : URL trouvable depuis l'interface Firebase Functions, en cliquant sur la fonction !

## PostgreSQL

### Tester la base de prod sans proxy

Depuis le fichier .env, il faut remplacer les logins et le host équivalent à la prod, mais pas le mode

### Backup / Restauration de Bdd depuis pgAdmin4

On extrait la bdd de manière récurrente

- Clic droit sur le nom de bdd > Backup : Nom du fichier, pas d'options.
  On peut restaurer la bdd
- Clic droit sur le nom de la bdd à restaurer > Restore : Nom du fichier, options [Queries: Clean Before Restore]

## NPM Packages

Quand on met à jour le ./package.json, attention à bien mettre à jour **MANUELLEMENT** le package suivant : `apps/back/src/package.json`

`npm outdated`
`npm update`
ou encore le package npm-check-update
`ncu`

## Deploymenent

Fichier de config firebase.json > https://firebase.google.com/docs/hosting/full-config?hl=fr

Front<br>
`npm run build:front`<br>
`npm run firebase:deploy:front`

Back<br>
`npm run build:back`<br>
`npm run firebase:deploy:back`

Lors du build du back, il faut que le fichier .env.prod soit envoyé dans '/dist/apps/back' et soit appelé _.env_. On le fait à la main via un script.

Lors du build du front, il faut que le fichier .env.production soit buildé également. ViteJS s'en occupe pour nous.

## Environnements

### Front

Voir dans le dossier environnements du projet front

### Back

Voir à la racine du projet back

## CORS

Ils sont obligatoire, le front et le back n'étant pas sur le même domaine.

---

## Generate code with NX

## NX x ReactJS

https://nx.dev/react-tutorial/1-code-generation

https://nx.dev/packages/nest

If you happen to use Nx plugins, you can leverage code generators that might come with it.

Run `nx list` to get a list of available plugins and whether they have generators. Then run `nx list <plugin-name>` to see what generators are available.

Learn more about [Nx generators on the docs](https://nx.dev/plugin-features/use-code-generators).

## Running tasks

To execute tasks with Nx use the following syntax:

```
nx <target> <project> <...options>
```

You can also run multiple targets:

```
nx run-many -t <target1> <target2>
```

..or add `-p` to filter specific projects

```
nx run-many -t <target1> <target2> -p <proj1> <proj2>
```

Targets can be defined in the `package.json` or `projects.json`. Learn more [in the docs](https://nx.dev/core-features/run-tasks).
