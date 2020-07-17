# To do List
> Esse projeto um um simples organizador de atividades e/ou lista de tarefas. Onde é inserido a atividade e a categoria a qual ela pertence. Pode marcar como concluída e excluir também.
---
## Desafio e Aprendizagem
> O maior desafio é utilizar o conceito de testes, onde estou utilizando esse projeto simples para que eu tenha um melhor entendimento de como funciona, também estou utilizando pela primeira vez o banco de dados postgresSQL. É muito proveito a cada projeto aplicar conhecimentos ja aprendidos em outros projeto e sempre acrescentado algo novo.
> Estou aproveitando para aprimorar meu conhecimento sobre as validações de formulários e sobre os roteamentos.
---
## Funcionalidades
- [x] Cadastrar categorias
- [x] Cadastrar atividades
- [x] Listar as categorias
- [x] Listar as atividades
- [x] Atualizar dados de categorias
- [x] Marcar atividade como concluída
- [x] Desmarcar atividade como concluída
- [x] Remover categorias
- [x] Remover atividades
- [x] Listar categorias ordenadas (crescente e decrescente)
- [ ] Listar atividades ordenadas (crescente, decrescente e por data de criação)
- [ ] Adicionar paginação na listagem de atividades
- [ ] Criar os testes
---
## Rotas
| Method | Rota | Body | Params | Descrição |
|-|-|-|-|-|
| GET | */category* | empty | empty | Rota para listar todas as categorias |
| GET | */category?order=asc* | empty | **order:** Order da listagem, pode ser 'asc' ou 'desc' | Rota para listar as categorias com um filtro |
| POST | */category* | **name\*:** nome da categoria.| empty | Rota para cadastrar uma categoria |
| DELETE | */category/:id* | empty | **id\*:** Identificador da categoria para ser excluída | Rota para apagar uma categoria |
| PUT | */category/:id* | **name\*:** Novo nome da categoria | **id\*:** Identificador da categoria a ser atualizado | Rota para atualizar o nome de uma categoria |
| GET | */task* | empty | empty | Listar todas as atividades |
| POST | */task* | **content\*:** Conteúdo, atividade a ser cadastrado. </br> **category_id\*:** Identificador da categoria para a qual essa atividade será cadastrada. | empty | Rota para cadastrar uma nova atividade |
| DELETE | */task/:id* | empty | **id\*:** Identificador da atividade que será excluída | Rota para remover uma atividade |
| PUT | */task/:id* | empty | **id\*:** Identificador da atividade | Rota que serve para marcar uma rota como concluída ou desmarcar como concluída |

> \* Atributos e/ou parâmetros obrigatórios.
---
## Autor

👤 **emanuel71jo**

* Website: emanuel71jo.github.io
* Github: [@emanuel71jo](https://github.com/emanuel71jo)
* LinkedIn: [@João Emanuel](https://linkedin.com/in/Joao-Emanuel)

***
## Show your support

Give a ⭐️ if this project helped you!

***
