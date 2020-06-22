import { PaginacaoDTO } from './paginacao-dto';

export interface RetornoBuscarEntregasDTO {

    abertas: PaginacaoDTO;
    andamento: PaginacaoDTO;
    finalizadas: PaginacaoDTO;
    excluidas: PaginacaoDTO;

}
