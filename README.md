# ArcOS Private Repository

This repository is in all means private, and cannot be shared to the outside world until the current code is packaged
for release. This repository is focused on keeping a backup of the code, containing in-progress code and descriptions
about them. Only authorized users have access to this repository, users with unauthorized rights will be banned from
the repository, as well as the user who gave access to said user.

If you do decide to clone the repository to your local drive and run `npm install`, please note the following things:

> Code found in your clone can and will have bugs, because there will be cloned code still in development.

> You can start this clone of electron by first initializing it by executing the following commands after cloning:
> 
> Linux:
> ```bash
> npm install
> cd ./node_modules/drivelist & ../.bin/electron-rebuild
> cd ../.. & npm start
> ```
> 
> Windows:
> ```batch
> npm install
> cd .\node_modules\drivelist && ..\.bin\electron-rebuild
> cd ..\.. && npm start
> ```