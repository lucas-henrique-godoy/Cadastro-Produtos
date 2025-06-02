# Projeto Cadastro de Produtos - Guia Didático

Este projeto é um CRUD de produtos feito em Angular, usando Angular Material para a interface. Abaixo, explico cada parte do projeto e os conceitos usados.

---

## 1. Estrutura do Projeto

- **src/app/models/produto.ts**: Define a interface Produto, que representa os dados de um produto.
- **src/app/services/produto.service.ts**: Serviço responsável por salvar, buscar, editar e excluir produtos usando o localStorage do navegador.
- **src/app/pages/produtos/listagem/**: Componente de listagem de produtos (tabela, filtro, paginação, ações de editar/excluir).
- **src/app/pages/produtos/formulario/**: Componente de formulário para cadastrar e editar produtos.
- **src/app/app.module.ts**: Módulo principal, onde são importados os módulos do Angular e do Angular Material.
- **src/app/app-routing.module.ts**: Define as rotas do projeto.
- **src/app/app.component.html**: Ponto de entrada da aplicação, exibe o conteúdo das rotas.

---

## 2. Conceitos e Tecnologias Usadas

### Angular
- **Componentes**: Unidades de interface (ex: listagem, formulário).
- **Serviços**: Classes para lógica de negócio e acesso a dados (ex: ProdutoService).
- **Módulos**: Agrupam componentes, serviços e outros módulos.
- **Roteamento**: Permite navegar entre páginas (listagem e formulário).
- **Reactive Forms**: Formulários reativos para validação e manipulação de dados.

### Angular Material
- **Tabela (mat-table)**: Exibe os produtos em formato de tabela, com ordenação e paginação.
- **Formulários (mat-form-field, matInput)**: Campos de entrada estilizados.
- **Diálogo (mat-dialog)**: Modal para cadastrar/editar produtos.
- **Snackbar (mat-snack-bar)**: Mensagens de feedback para o usuário.
- **Paginator e Sort**: Paginação e ordenação da tabela.

### LocalStorage
- Usado para armazenar os produtos no navegador, simulando um "banco de dados" local.

---

## 3. Como cada parte funciona

### Produto (src/app/models/produto.ts)
Define os campos de um produto:
- id: número único
- codigo: string identificadora
- nome: nome do produto
- descricao: descrição (opcional)
- valor: preço
- custo: custo

### ProdutoService (src/app/services/produto.service.ts)
- **getAll()**: Busca todos os produtos do localStorage.
- **findById(id)**: Busca um produto pelo id.
- **save(produto)**: Salva um novo produto ou atualiza um existente. Gera id e código automaticamente se necessário.
- **delete(id)**: Remove um produto pelo id.
- **generateId()**: Gera um novo id incremental.
- **generateCodigo()**: Gera um novo código incremental.

### ListagemComponent (src/app/pages/produtos/listagem/)
- Exibe a tabela de produtos.
- Permite filtrar por nome ou código.
- Permite editar ou excluir produtos.
- Usa MatTableDataSource para integração fácil com Material Table, paginação e ordenação.
- Usa MatDialog para abrir o formulário em modal.

### FormularioComponent (src/app/pages/produtos/formulario/)
- Formulário reativo para cadastrar ou editar produtos.
- Valida campos obrigatórios e valores mínimos.
- Aplica máscara de moeda (R$) nos campos valor e custo sem bibliotecas externas.
- Mostra mensagens de erro e sucesso com MatSnackBar.
- Usa MatDialogRef para fechar o modal e retornar o produto salvo.

### CSS dos Componentes
- **Listagem**: Centraliza a tabela, define largura das colunas, responsividade e estilos para cabeçalho e células.
- **Formulário**: Layout flexível, campos lado a lado, textarea expandível, feedback visual para sucesso/erro.

### Roteamento (src/app/app-routing.module.ts)
- Define as rotas:
  - `/listagem`: página principal com a tabela de produtos
  - `/formulario`: formulário de cadastro/edição (usado principalmente via modal)
  - Redireciona `/` para `/listagem`

### AppComponent
- Componente raiz, apenas exibe o `<router-outlet>`, que mostra a página da rota atual.

---

## 4. Dicas e Aprendizados

- **Angular Material** facilita muito a criação de interfaces modernas e responsivas.
- **Reactive Forms** são poderosos para validação e manipulação de dados.
- **LocalStorage** é útil para protótipos e testes sem backend.
- **Serviços** centralizam a lógica de dados, facilitando manutenção e testes.
- **Componentização** deixa o código organizado e reutilizável.
- **Máscara de moeda** pode ser feita manualmente manipulando o valor do input.

---

## 5. Como estudar este projeto

1. Navegue pelos arquivos de cada componente e serviço.
2. Veja como os dados fluem do formulário para o serviço e para a tabela.
3. Experimente adicionar novos campos ou validações.
4. Tente trocar o armazenamento para um backend real (ex: API REST).
5. Consulte a documentação do Angular e do Angular Material para aprofundar.

---

Qualquer dúvida, estude cada arquivo e pesquise os termos que não conhecer. Bons estudos! 