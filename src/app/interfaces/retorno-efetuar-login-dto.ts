import { TipoUsuarioEnum } from '../enums/tipo-usuario.enum';
import { PaginacaoDTO } from './paginacao-dto';
import { RetornoBuscarEntregasDTO } from './retorno-buscar-entregas-dto';

export interface RetornoEfetuarLoginDTO {

    codigoUsuario: number;
    nomeUsuario: string;
    tipoUsuario: TipoUsuarioEnum;
    nota: number;
    entregas: RetornoBuscarEntregasDTO;

}
