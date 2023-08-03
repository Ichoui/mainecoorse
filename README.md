# Mainecoorse

https://nx.dev/react-tutorial/1-code-generation 

https://nx.dev/packages/nest

## Description

Nest et Firebase utilisation [NESTxFIREBASE](https://reza-rahmati.medium.com/setup-nest-and-firebase-functions-in-a-new-project-631ba1435289)

Autre lien helpful : https://itnext.io/nx-nest-firebase-the-dream-616e8ee71920 

## Journal de Debug GCP
https://console.cloud.google.com/welcome?authuser=0&hl=fr&project=mainecoorse 
Menu > Journaux > Explorateur de journaux

Permet de voir tous logs d'erreur


## PostgreSQL

Tester la base de prod sans proxy : depuis le fichier .env, il faut remplacer les logins et le host équivalent à la prod, mais pas le mode

## Environnements
### Front
Voir dans le dossier environnements

### Back 
Voir à la racine du projet


## Deploymenet

Front<br>
`npm run build:front`<br>
`npm run firebase:deploy:front`

Back<br>
`npm run build:back`<br>
`npm run firebase:deploy:back`

A noter : lors du build du back, il faut que le fichier .env.prod soit envoyé dans '/dist/apps/back' et soit appelé _.env_ 



----------------------------------------------------------
## Generate code with NX

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

