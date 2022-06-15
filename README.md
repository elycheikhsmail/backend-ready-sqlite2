# oak-file-system routing project template

this is oak project templates based on oak where routing is generated based on
file-system routing for example we have the following mapping :

```
file          relative path                  route path                  http method
g_.ts         pagesCtrl/todos/g_.ts            todos/                       GET
g_[id].ts     pagesCtrl/todos/g_[id].ts        todos/:id/                   GET
p_.ts         pagesCtrl/todos/g_.ts            todos/                       POST
d_[id].ts     pagesCtrl/todos/d_[id].ts        todos/:id/                   DELETE
put_[id].ts   pagesCtrl/todos/put_[id].ts      todos/:id/                   PUT
```

this template include cli for generating controller that respect the convention
for example :

```
deno run --allow-write cli/public.ts  g_.ts todos
```

this will create file g_ts in pagesctr/todos (todos and pagesCtrl folders must
exist befor running this command) this file will be filled with function act as
oak controller and give you ready code to copy past in server_public.ts in
similar way you can understand

```
deno run --allow-write cli/private.ts  g_.ts todos
```

and

```
deno run --allow-write cli/admin.ts  g_.ts todos
```

in dev mode leave pageCtrl/examples content as it and append code as you like to
files server_*.ts but don't remove any initial content from those files.

this template try to respect some good rules and principes :

- single responsability principle :

each file in pagesCtrl contain (basicly) one function that handle one http
methode(get,post,...)

server_public.ts file is designe to groupe public url

server_private.ts file is designe to groupe private url, I mean by that it can
only accessed by current authentificate user (not admin)

server_admin file is designe to groupe admin url, I mean by that current
authentificate admin can access it

- no meta programming no magic as one of deno code style then you can any valide
  ts-deno code without any problem
- central place for deps I use import_map.json file for mapping may deps

# deno verion supported

deno 1.20.4 or higher

# try this template

clone it then open project in your IDE (I recommand Vscode) run command :

```
deno run --allow-net server.ts
```

then open the url

```
http://localhost:3000/examples/public
```

in your browser then

```
http://localhost:3000/examples/private
```

```
http://localhost:3000/examples/admin
```

read this readme and the project structure and content in you Vscode to better
understand this template

# database

this template is database ignostic, then you can use any db of choice but use
import_map.json as central place for you deps

# inspiration

- esm (es modules)
- nextjs routing
- django apps and internal modularity
