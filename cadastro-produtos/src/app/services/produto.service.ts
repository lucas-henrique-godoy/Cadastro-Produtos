import { Injectable } from '@angular/core';
import { Produto } from '../models/produto';
import { findIndex } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {
  private readonly STORAGE_KEY = 'produtos';

  constructor() { }

  //Buscar todos os produtos
  getAll(): Produto[] {
    const produtosJson = localStorage.getItem(this.STORAGE_KEY);
    if (!produtosJson) {
      return [];
    }
    return JSON.parse(produtosJson);
  }

  findById(id: number): Produto | undefined {
    const produtos = this.getAll();
    const produto= produtos.find(p => p.id === id);
     return produto;
  }

  //Salvar um produto (novo ou atualizar)
  save(produto: Produto): void {
    const produtos = this.getAll();//Pega todos os produtos cadastrados
    const index = produtos.findIndex(p => p.id === produto.id); //Busca o indice de um produto que tenha  mesmo id, e findIndex retorna -1 se não encontrar.

    if (index === -1) {
      //Novo produto - gerar id único
      produto.id = this.generateId(produtos);
      produtos.push(produto);
    } else {
      //Atuaizar produto existente
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
  
  //Gerar um id único  incremental(Esse método calcula o próximo id disponível.)
  private generateId(produtos: Produto[]): number {
    if (produtos.length === 0) {
      return 1;                         //Se a lista estiver vazia, retorna 1.
    }
    return Math.max(...produtos.map(p => p.id)) + 1; //Se houver produtos, pega o maior id e soma 1,Isso evita duplicidade de id, mesmo sem banco de dados.
  }
}
