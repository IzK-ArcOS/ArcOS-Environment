# ArcOS Environment Repository (repo 1)

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
> Note: on windows you'll need vs2015 or newer installed with "Desktop Development with C++"

## ArcOS Updater

Since r17, you can now download and install updates through Settings.

There is one issue that we discovered during testing: you NEED to run ArcOS as administrator on Windows in order to extract the update package properly.

We are working to solve this issue.
