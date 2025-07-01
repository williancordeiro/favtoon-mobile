# Favtoon Mobile

Favtoon permite ao usuário adicionar suas series animadas favoritas como forma de listar as series ja assistidas.

# Funcionalidades

- [ x ] Criação de perfil de usuário;
- [ x ] Upload da imagem de perfil;
- [ x ] Adiçao de series animadas;
- [ x ] Adição de animes e desenhos ocidentais;
- [ x ] Upload da imagem da serie;
- [ x ] Listagem das series ja adicionadas;
- [ x ] Possibilidade de editar a serie adicionada;
- [ x ] Possibilidade de exclusão da serie;

# Print de Telas do aplicativo

<img src="public/images/print1.PNG" width="250" />
<img src="public/images/print2.PNG" width="250" />
<img src="public/images/print3.PNG" width="250" />
<img src="public/images/print4.PNG" width="250" />

# Comandos para o projeto funcionar

Para iniciar o `Favtoon Mobile` é preciso primeiro iniciar o JSON Server para assim gravar as alterações de Series no "Banco de Dados"

Atualizar o arquivo `PocketBase.example.ts` com as informações do seu servidor PocketBase, e renomear o arquivo para `PocketBase.ts`.

Após isso, Inicie a aplicação com o comando:

```
yarn start --clear
```

ou

```
yarn android --clear
```

# Prova 2 - PDM

### Pergunta 1:
Qual a diferença entre testes unitários e testes E2E (End to End) em aplicações mobile? 

Os testes unitários tem como foco testar partes isoladas do código, como funções, classes, metodos especificos.

Os testes E2E tem como foco testar o comportamento completo da aplicação, simulando as interações reais do usuario, e fluxos completos, como cliques, navegação entre telas, etc.

Testes automatizados com o Maestro

Para executar os testes automatizados, é necessário ter o Maestro instalado e configurado corretamente. Após isso, execute o seguinte comando na raiz do projeto:

```bash
maestro test maestro/register.yaml
```
### Isso irá executar o teste de registro definido no arquivo `maestro/register.yaml`.

```bash
maestro test maestro/login.yaml
```
### Isso irá executar o teste de login definido no arquivo `maestro/login.yaml`.

```bash
maestro test maestro/serie-add.yaml
```
### Isso irá executar o teste de adição de série definido no arquivo `maestro/serie-add.yaml`.