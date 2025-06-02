import { Injectable } from '@angular/core';
import { Produto } from '../models/produto';
import { findIndex } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {
  private readonly STORAGE_KEY = 'produtos'; //Essa é a chave usada para salvar e ler os produtos do localStorage do navegador.

  constructor() { }

  //Buscar todos os produtos
  getAll(): Produto[] {
    const produtosJson = localStorage.getItem(this.STORAGE_KEY);
    if (!produtosJson) {
      return [];
    }
    return JSON.parse(produtosJson);
  }

  //Busca um produto pelo id
  findById(id: number): Produto | undefined {
    const produtos = this.getAll();
    const produto= produtos.find(p => p.id === id);
     return produto;
  }

  //Salvar um produto (novo ou atualizar)
 save(produto: Produto): void {
  const produtos = this.getAll();

  // Se codigo estiver vazio, gerar um código novo
  if (!produto.codigo || produto.codigo.trim() === '') {
    produto.codigo = this.generateCodigo(produtos);
  }

  // Verificar se código já existe em outro produto (com id diferente)
  const existeCodigo = produtos.some(p => p.codigo === produto.codigo && p.id !== produto.id);
  if (existeCodigo) {
    throw new Error('Código já existe para outro produto.');
  }

  // Buscar índice pelo id
  const index = produtos.findIndex(p => p.id === produto.id);

  if (index === -1) {
    // Produto novo, gera id e adiciona
    produto.id = this.generateId(produtos);
    produtos.push(produto);
  } else {
    // Produto existente, atualiza
    produtos[index] = produto;
  }

  localStorage.setItem(this.STORAGE_KEY, JSON.stringify(produtos));
}


  //deletar produto pelo id
  delete(id: number): void {
    let produtos = this.getAll();
    produtos = produtos.filter(p => p.id !== id); //cria um novo array sem o produto do id informado.
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(produtos)); //Atualizamos o localStorage com o novo array.
  }
  

  //#region "Específicos"

  //Gerar um id único  incremental(Esse método calcula o próximo id disponível.)
  private generateId(produtos: Produto[]): number {
    if (produtos.length === 0) {
      return 1;                         //Se a lista estiver vazia, retorna 1.
    }
    return Math.max(...produtos.map(p => p.id)) + 1; //Se houver produtos, pega o maior id e soma 1,Isso evita duplicidade de id, mesmo sem banco de dados.
  }


  private generateCodigo(produtos: Produto[]): string {
    //Exemplo: Código será "PROD" + número incremental baseando na quantidade atual

    const numeros = produtos
    .map(p => {
      const match = p.codigo.match(/\d+$/);
      return match ? parseInt(match[0], 10): 0;
    });
    const maxNumero= numeros.length ? Math.max(...numeros): 0;
    return 'PROD-' + (maxNumero + 1).toString().padStart(2, '0')
  }




  //#endregion
}
