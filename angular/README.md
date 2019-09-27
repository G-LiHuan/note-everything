# Angular 问题与解决方案集锦

-----------



## 1. Angular 热模块更新

问题描述： 由于项目代码越来越多，引入的第三方插件也越来越多，导致开发过程中每次代码修改引起的重新编译时间也逐渐增加，严重影响开发体验和效率。经过查阅资料，可以通过HMR的方式实现angular``模块级别``的热更新，每次只会重新编译和更新修改文件所在的模块，从而降低编译时间。



 **本文中所提供的方法也是借鉴了其他文章的方法，只是我在按照他们的流程做下来遇到一些问题，我这边进行整理补充，如有雷同，纯属事实。**



#### angular启动HMR的步骤：

1. 修改environmen文件

   修改environments/environment.ts文件如下

   ~~~typescript
   export const environment = {
     production: false,
     hmr: true,
   };
   ~~~

   修改environments/environment.prod.ts文件如下

   ~~~typescript
   export const environment = {
     production: true,
     hmr: false,
   };
   ~~~

   

2. 安装第三方模块

   ~~~shell
   npm install --save-dev @angularclass/hmr
   npm install --save-dev @types/node
   ~~~

   第一个是用于实现热更新的第三方插件，第二个是待会需要修改``main.ts``，其中需要用到``module``关键字，需要安装``@types/node``防止启动报错；

   

   安装完``@types/node``之后需要确保tsconfig.json中，需要确保其中``compilerOptions.typeRoots``的值中包含``node_modules/@types``,或者``compilerOptions.types``的值包含``node``；

   ~~~json
   "compilerOptions": {
     ...
     "typeRoots": [
       ...
       "node_modules/@types"
       ...
     ]
   }
   或者
   "compilerOptions": {
     ...
     "types": [
       ...
       node
       ...
     ]
   }
   ~~~

   

   

3. 创建``src/hmr.ts``文件

   ~~~typescript
   import { NgModuleRef, ApplicationRef } from '@angular/core';
   import { createNewHosts } from '@angularclass/hmr';
   
   export const hmrBootstrap = (module: any, bootstrap: () => Promise<NgModuleRef<any>>) => {
     let ngModule: NgModuleRef<any>;
     module.hot.accept();
     bootstrap().then(currentModule => ngModule = currentModule);
     module.hot.dispose(() => {
       const appRef: ApplicationRef = ngModule.injector.get(ApplicationRef);
       const elements = appRef.components.map(c => c.location.nativeElement);
       const removeOldHosts = createNewHosts(elements);
       ngModule.destroy();
       removeOldHosts();
     });
   };
   
   ~~~

   

4. 修改``src/main.ts``文件

   ~~~typescript
   import { enableProdMode } from '@angular/core';
   import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
   
   import { AppModule } from './app/app.module';
   import { environment } from './environments/environment';
   
   import { hmrBootstrap } from './hmr';
   
   const bootstrap = () => platformBrowserDynamic().bootstrapModule(AppModule);
   
   if (environment.production) {
     enableProdMode();
   } else {
     if (environment.hmr) {
       // tslint:disable-next-line:no-string-literal
       if (module['hot']) {
         hmrBootstrap(module, bootstrap);
       } else {
         console.log('Amm..HMR is not enabled for webpack');
       }
     } else {
       bootstrap();
     }
   }
   ~~~

   



按照以上步骤修改完成之后，就可以重新运行``ng serve --hmr``体验热更新了.