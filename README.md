# HdpApp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.5.3.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

___________________________________________________________________________________________________________________________________________________________________

DOCUMENTAÇÃO PESSOAL

MIGRAÇÃO ANGULAR 10

ng update @angular/cdk@9 --force

COM NODE 18 AGORA

PROTRACTOR:
angular.json=> Remover scripts do Protractor: pode remover toda a seção e2e, exemplo:
"e2e": {
        "builder": "@angular-devkit/build-angular:protractor",
        "options": {
          "protractorConfig": "e2e/protractor.conf.js"
        }
      }
Remover a pasta e2e:Da raiz do projeto.
DEPOIS: npm uninstall protractor.


npm install @fortawesome/angular-fontawesome@0.6.0 --save

Remove-Item node_modules -Recurse => REMOVE NODE_MODULES
Remove-Item package-lock.json => REMOVE PACKAGE-LOCK.JSON
npm cache clean --force
npm install


git remote -v

--07/10/2024 commit=>"1" = VINCULAÇÃO AO GIT https://github.com/ViniVLS/appStatusDivina

npm i primeng@10 --force

--07/10/2024 commit=>"2" = ANGULAR 10 FUNCIONANDO.
________________________________________________________________________________________________________________________

MIGRAÇÃO ANGULAR 11

ng update @angular/core@11 @angular/cli@11

Remove-Item node_modules -Recurse => REMOVE NODE_MODULES
Remove-Item package-lock.json => REMOVE PACKAGE-LOCK.JSON
npm cache clean --force
npm install --NÃO FUNCIONOU AQUI E SIM NO PRÓXIMO PASSO:
npm i ng2-currency-mask@11 --force


npm i @angular/cdk@11 --force

npm uninstall @fortawesome/angular-fontawesome
npm install @fortawesome/angular-fontawesome@0.8.0 --force => PARA NOVA VERSÃO

npm install primeng@11 --force => NOVA VERSÃO

--07/10/2024 commit=>"3" = ANGULAR 11 FUNCIONANDO.

_______________________________________________________________________________________________________________________

MIGRAÇÃO ANGULAR 12

ng update @angular/core@12 @angular/cli@12

PRIMENG 12
npm install @angular/cdk@^12.0.0

npm install primeng@^12.0.0
________________________________________________________________________________________________________________________

MIGRAÇÃO ANGULAR 13

npm install ng2-currency-mask@13

ng update @angular/core@13 @angular/cli@13

No rc/app/app.component.ts excluir a importação: import { and } from "@angular/router/esm2015/src/utils/collection";

E no outro TS src/app/login/login/login.component.ts mudar a importação import { NgForm } from "@angular/forms/esm2015/src/directives";
Para import { NgForm } from "@angular/forms/forms";

npm install @fortawesome/angular-fontawesome@^0.10.2

npm install @angular/cdk@13

DE import { JwtModule } from "@auth0/angular-jwt";
PARA import { JwtModule } from "@auth0/angular-jwt/index";

Nas novas importações do primeng 13 os endereços perdem todas as letras maiusculas e deve-se realizar em todos componentes, só se verá progresso na compilação se mudar todos.Ex:
DE import { InputTextModule } from "primeng/inputText";
PARA import { InputTextModule } from "primeng/inputtext";

OUTRA:
DE import { FormsModule } from "@angular/forms";
PARA import { FormsModule } from "@angular/forms/forms";


DE import { PasswdService } from './../passwd.service';
PARA import { PasswdService } from '../passwd.service';

--07/10/2024 commit=>"5" = ANGULAR 13 FUNCIONANDO.
___________________________________________________________________________________________________________________________________

MIGRAÇÃO ANGULAR 14

ng update @angular/core@14 @angular/cli@14

E no login,component.ts atualizar a importação:
import { NgForm } from "@angular/forms/forms";
PARA:  import { NgForm } from "@angular/forms";

npm i @angular/cdk@14 --force

--08/10/2024 commit=>"6" = ANGULAR 14 FUNCIONANDO.
___________________________________________________________________________________________________________________________________

MIGRAÇÃO ANGULAR 15

ng update @angular/core@15 @angular/cli@15

npm i @angular/cdk@15 --force

PRIMENG 15
Problema, captcha do primeng descontinuado.
Removido o captcha.

--08/10/2024 commit=> "7" = ANGULAR 15 FUNCIONANDO.
___________________________________________________________________________________________________________________________________

MIGRAÇÃO ANGULAR 16

Zone.js versão 0.13.x ou post.: npm i zone.js@0.13 --force

ng update @angular/core@16 @angular/cli@16

Usar node 18.20

Install "@auth0/angular-jwt": "^5.1.2",

Add tooltips do primeng no "sair()" e "Whatsapp()"

--08/10/2024 commit=> "8" = ANGULAR 16 FUNCIONANDO.
__________________________________________________________________________________________________________________________________

MIGRAÇÃO ANGULAR 17

Node v18.13 ou posterior.

Remove-Item node_modules -Recurse => REMOVE NODE_MODULES
Remove-Item package-lock.json => REMOVE PACKAGE-LOCK.JSON
npm cache clean --force
npm i --force

Zone.js v0.14.x ou posterior.

ng update @angular/core@17 @angular/cli@17 --force.

Add o metodo: checkForUpdates(){} no app.module.ts

npm i primeng@17 --force

--08/10/2024 commit=> "9" = Salvo até aqui
____________________________________________________________________________________________________________________________________

MIGRAÇÃO ANGULAR 18

npm install -g @angular/cli@18

ng update @angular/core@18 @angular/cli@18 --force

npm outdated = atualizar manualmente cada pacote menos o typescript que precisa ficar na v5.5.0

Remove-Item node_modules -Recurse => REMOVE NODE_MODULES
Remove-Item package-lock.json => REMOVE PACKAGE-LOCK.JSON
npm cache clean --force
npm i --force

--09/10/2024 commit=> "10" = ANGULAR 18 FUNCIONANDO
git push -u origin master = Salvo no git:
origin  https://github.com/ViniVLS/appStatusDivina.git (fetch)
origin  https://github.com/ViniVLS/appStatusDivina.git (push)

