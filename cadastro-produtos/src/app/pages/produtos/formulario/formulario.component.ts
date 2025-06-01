import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProdutoService } from 'src/app/services/produto.service';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent implements OnInit {
  form!: FormGroup;

  constructor(private fb: FormBuilder, private produtoService: ProdutoService) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      id: [''],
      codigo: ['', [Validators.required]],
      nome: ['', [Validators.required, Validators.minLength(3)]],
      descricao: [''],
      valor: [0, [Validators.required, Validators.min(0)]],
      custo: [0, [Validators.required, Validators.min(0)]]
    });
  }

  onSubmit(){
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const produto = this.form.value;
    this.produtoService.save(produto);
    this.form.reset;
  }

}
