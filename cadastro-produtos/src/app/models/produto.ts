export interface Produto {
    id: number;
    codigo: string;
    nome: string;
    descricao?: string;
    valor: number;
    custo: number;
}