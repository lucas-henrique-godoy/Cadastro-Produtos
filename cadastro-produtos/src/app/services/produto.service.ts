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
}
