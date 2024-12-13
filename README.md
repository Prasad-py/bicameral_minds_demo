## Usage
### Run Next ( web application ) in dev mode :
You can use `npm run next:dev` to start a next web application in development mode with hot reload.
### Run Electron ( desktop application ) in dev mode :
You can use `npm run electron:dev` to start an electron desktop application in development mode with hot reload.
### Build & Start Next ( web application ) :
You can build your next web application by using `npm run next:build`. Then you can start it in production mode with `npm run next:start`.
### Build Electron ( desktop application ) :
You can build your Electron desktop application on different systems by using the commands bellow :
```
npm run electron:build-current        Build for current system
npm run electron:build-all            Build on all systems
npm run electron:build-win32          Build on Windows x32
npm run electron:build-win64          Build on Windows x64
npm run electron:build-linux          Build for linux*
npm run electron:build-mac            Build for MacOs**
npm run electron:build-mac-universal  Universal build for MacOs**
```
*For linux, you can change the package type ( snap, deb... ) by editing the [electron-builder.yml](./electron-builder.yml) file. You may need to install some packages ( for exemple rmp to build a `rpm`).

**MacOs versions can only be build using a Mac.

**For full usage, please read the [Nextron documentation](https://github.com/saltyshiomix/nextron).**
## Shadcn/ui
To install Shadcn/ui components, just use `npx shadcn@latest add MY-COMPONENT` as explained in the [official documentation](https://ui.shadcn.com/docs/installation/next).



npm, yarn

nvm 
node 20

npm install / yarn

npm run next:dev / yarn next:dev


https://www.creative-tim.com/twcomponents/cheatsheet/

https://ui.shadcn.com/docs/components/accordion


