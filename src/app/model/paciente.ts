export interface PacienteDados {
  atendimento: string;
  paciente: string;
  atualizado: string;
  dtentrada: string;
  classificacao: string;
  status: string;
  cor: string;
}

export class Paciente {
  cd_MEDICO_RESP: string;
  cd_UNIDADE: string;
  ds_CONVENIO: string;
  ds_SETOR_ATENDIMENTO: string;
  ds_risco: string;
  dt_ENTRADA: string;
  dt_PREVISTO_ALTA: string;
  horas: string;
  ie_SEXO: string;
  ie_precaucao: string;
  nm_medico: string;
  nm_paciente: string;
  nr_ANOS: string;
  nr_atendimento: string;
  setor: string;
}


