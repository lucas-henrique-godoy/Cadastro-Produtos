import { Produto } from './../../../models/produto';
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MatSnackBar } from '@angular/material/snack-bar';
import { ProdutoService } from 'src/app/services/produto.service';


@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent {
  form: FormGroup;
  codigoDuplicado: boolean = false;




  constructor(
  public dialogRef: MatDialogRef<FormularioComponent>,
  @Inject(MAT_DIALOG_DATA) public data: Produto | null,
  private fb: FormBuilder,
  private snackBar: MatSnackBar,
  private produtoService: ProdutoService

) {
  const produto: Produto = data ?? {
    id: 0,
    codigo: '',
    nome: '',
    descricao: '',
    valor: 0,
    custo: 0
  };

  this.form = this.fb.group({
    id: [produto.id],
    codigo: [produto.codigo, [Validators.minLength(3), Validators.maxLength(20)]],
    nome: [produto.nome, [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
    descricao: [produto.descricao, [Validators.maxLength(500)]],
    valor: [produto.valor, [Validators.required, Validators.min(0)]],
    custo: [produto.custo, [Validators.required, Validators.min(0)]],
  });
}



  salvar() {
  this.codigoDuplicado = false;  // Resetar antes de validar

  if (this.form.invalid) {
    this.snackBar.open('Formulário inválido. Verifique os campos.', 'Fechar', {
      duration: 3000,
      panelClass: ['snackbar-erro']
    });
    return;
  }

  const produto: Produto = this.form.value;

  if (produto.codigo && produto.codigo.trim() !== '') {
    const produtos = this.produtoService.getAll();
    const existeCodigoDuplicado = produtos.some(p =>
      p.codigo === produto.codigo && p.id !== produto.id
    );

    if (existeCodigoDuplicado) {
      this.codigoDuplicado = true;  // Ativa o erro no template
      this.snackBar.open('Código já existe para outro produto.', 'Fechar', {
        duration: 3000,
        panelClass: ['snackbar-erro']
      });
      return; // Não fecha o diálogo, para usuário corrigir
    }
  }

  this.dialogRef.close(produto);
  this.snackBar.open('Produto salvo com sucesso!', 'Fechar', {
    duration: 3000,
    panelClass: ['snackbar-sucesso']
  });
}

  cancelar() {
    this.dialogRef.close(null);
  }

  formatarMoeda(campo: 'valor' | 'custo') {
    let valor = this.form.get(campo)?.value;
    if (typeof valor !== 'string') valor = valor?.toString() ?? '';
    // Remove tudo que não for número
    valor = valor.replace(/\D/g, '');
    // Converte para centavos
    let numero = parseFloat(valor) / 100;
    if (!isNaN(numero)) {
      // Formata para moeda brasileira
      this.form.get(campo)?.setValue(
        numero.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }),
        { emitEvent: false }
      );
    } else {
      this.form.get(campo)?.setValue('', { emitEvent: false });
    }
  }
}
