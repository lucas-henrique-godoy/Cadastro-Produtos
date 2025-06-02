import { Component, OnInit,ViewChild } from '@angular/core';
import { Produto } from 'src/app/models/produto';
import { ProdutoService } from 'src/app/services/produto.service';
import { MatTableDataSource } from '@angular/material/table'
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { FormularioComponent } from '../formulario/formulario.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-listagem',
  templateUrl: './listagem.component.html',
  styleUrls: ['./listagem.component.css']
})
export class ListagemComponent implements OnInit {
  colunas: string[] = ['codigo', 'nome', 'descricao', 'valor','custo', 'acoes'];
  dataSource: MatTableDataSource<Produto>;

   @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private produtoService: ProdutoService, private dialog: MatDialog, private snackBar: MatSnackBar) {
    this.dataSource = new MatTableDataSource<Produto>([]);
    this.carregarProdutos();

  }

  ngOnInit(): void {
  }

  carregarProdutos(): void {
    const produtos = this.produtoService.getAll();
    this.dataSource = new MatTableDataSource(produtos);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    this.dataSource.filterPredicate = (data: Produto, filter: string) =>
    data.nome.toLowerCase().includes(filter) || data.codigo.toLowerCase().includes(filter);
  }

  aplicarFiltro(event: Event): void {
    const valorFiltro = (event.target as HTMLInputElement).value;
    this.dataSource.filter = valorFiltro.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }

  }

  abrirModal(produto?: Produto): void {
  const dialogRef = this.dialog.open(FormularioComponent, {
    width: '500px',
    data: produto ? { ...produto } : null,
  });

  dialogRef.afterClosed().subscribe((resultado: Produto | null) => {
    if (resultado) {
      this.produtoService.save(resultado);
      this.carregarProdutos();
    }
  });
}


  excluir(id: number): void {
    this.produtoService.delete(id);
    this.snackBar.open('Produto excluído com sucesso!', 'Fechar', {
      duration: 3000,
      panelClass: ['snackbar-erro']
    })
    this.carregarProdutos();
  }
}
