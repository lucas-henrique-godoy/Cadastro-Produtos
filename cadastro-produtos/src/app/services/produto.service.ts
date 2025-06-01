import { Injectable } from '@angular/core';
import { Produto } from '../models/produto';

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

  //Salvar um produto (novo ou atualizar)
  save(produto: Produto): void {
    const produtos = this.getAll();
    const index = produtos.findIndex(p => p.id === produto.id);

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
    produtos = produtos.filter(p => p.id !== id);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(produtos));
  }
  
  //Gerar um id único  incremental
  private generateId(produtos: Produto[]): number {
    if (produtos.length === 0) {
      return 1;
    }
    return Math.max(...produtos.map(p => p.id)) + 1;
  }
}
