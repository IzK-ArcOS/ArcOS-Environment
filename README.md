# ArcOS Environment Repository (repo 1)

> ⚠️ **IMPORTANT NOTE** ArcOS itself is undergoing a rewrite in a private repository in this organization. You can expect it to come online sooner or later, once the core parts of the codebase are figured out and polished.

> ⚠️ ArcOS will be undertaking some huge codebase changes in the coming months

WARNING: any code in this repository can and will have bugs, because that code will still be in development. Please take note of this, because it can result in corruption of your ArcOS user account, depending on what code is actually in development.

If you do decide to clone the repository to your local drive, please follow these instructions:

> You can start this clone of ArcOS by first initializing it. To do this, execute the following commands after cloning:
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

## ArcOS Updater

> ⚠️ **The ArcOS Updater has been forcefully disabled because of issues with file changes**

~~Since r17, you can now download and install updates through Settings.~~

~~There is one issue that we discovered during testing: you NEED to run ArcOS as administrator on Windows in order to extract the update package properly.~~

~~We are working to solve this issue.~~