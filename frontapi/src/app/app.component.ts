import { Component, OnInit } from '@angular/core';

import { EmpresaService } from './services/empresa.service';
import { Empresa } from './models/empresa';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  // title = 'frontapi';
  empresa = {} as Empresa;
  empresas: Empresa[] = [];

  constructor(private empresaService: EmpresaService) {}

  ngOnInit(): void {
    this.listarEmpresas()
  }

  // definir se uma empresa será criada ou alterada
  inserirEmpresa(form: NgForm) {
    if (this.empresa.id !== undefined) {
      this.empresaService.alterarEmpresa(this.empresa).subscribe(() => {
        this.limparForm(form);
      });
    } else {
      this.empresaService.inserirEmpresa(this.empresa).subscribe(() => {
        this.limparForm(form);
      });
    }
  }

  listarEmpresas(){
    this.empresaService.listarEmpresas().subscribe((empresas: Empresa[]) => {
      this.empresas = empresas;
    });
  }

  // ecluir empresa
  excluirEmpresa(empresa: Empresa) {
    this.empresaService.excluirEmpresa(empresa).subscribe(() => {
      this.listarEmpresas();
    });
  }

  // alterar empresa
  alterarEmpresa(empresa: Empresa) {
    this.empresa = { ...empresa };
  }

  // limpar formulario
  limparForm(form: NgForm) {
    this.listarEmpresas();
    form.resetForm();
    this.empresa = {} as Empresa;
  }

}
