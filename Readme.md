# SimpleApp

SimpleApi inplementado em .NET 6.0

## instalar backend

> git clone git@github.com:alexyucra/SimpleApi.git

> cd SimpleApi

> dotnet buil

> dotnet run

## instalar frontentd

frontend implementado com angular 8

> git clone git@github.com:alexyucra/SimpleApp.git

> cd simpleapp

> npm install

> ng build

> ng serve -o

## instal con docker

simpleapi(backend)  contiene Dockerfile para container, verifique as portas antes de buildar

> cd simpleapi

>  docker build -t simpleapi -f Dockerfile . 

simpleapp(frontend)  contiene Dockerfile para container, verifique as portas antes de buildar

> cd simpleapp

>  docker build -t simpleapp -f Dockerfile .