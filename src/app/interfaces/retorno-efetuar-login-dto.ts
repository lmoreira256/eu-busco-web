import { TipoUsuarioEnum } from '../enums/tipo-usuario.enum';
import { PaginacaoDTO } from './paginacao-dto';

export interface RetornoEfetuarLoginDTO {

    codigoUsuario: number;
    nomeUsuario: string;
    tipoUsuario: TipoUsuarioEnum;
    nota: number;
    entregasUsuarioAbertas: PaginacaoDTO;
    entregasUsuarioAndamento: PaginacaoDTO;
    entregasAbertas: PaginacaoDTO;
    entregasFinalizadas: PaginacaoDTO;

}
