import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Empresa } from '../models/empresa';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {

  // url = 'http://localhost:5118/api/Empresa'; // simpleapi url
  url = 'https://localhost:7185/api/Empresa'; // simpleapi url
  
  constructor(private httpClient: HttpClient) { }

  // Headers
  httpOptions = {
    headers: new HttpHeaders({ 'content-type': 'application/json',
                                'Access-Control-Allow-Origin': 'http://localhost:4200',
                                'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT' 
                              })
  }

  // listar empresas
  listarEmpresas(): Observable<Empresa[]> {
    console.log(this.url);
    return this.httpClient.get<Empresa[]>(this.url)
      .pipe(
        retry(2),
        catchError(this.handleError))
  }

  // apresentar empresa pelo id
  apresentarEmpresaById(id: number): Observable<Empresa> {
    return this.httpClient.get<Empresa>(this.url + '/' + id)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  // inserção
  inserirEmpresa(empresa: Empresa): Observable<Empresa> {
    return this.httpClient.post<Empresa>(this.url, JSON.stringify(empresa), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  // Alteração
  alterarEmpresa(empresa: Empresa): Observable<Empresa> {
    return this.httpClient.put<Empresa>(this.url + '/' + empresa.id, JSON.stringify(empresa), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  // Exclusão
  excluirEmpresa(empresa: Empresa) {
    return this.httpClient.delete<Empresa>(this.url + '/' + empresa.id, this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }


  // Handle error function
  handleError(error: HttpErrorResponse){
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Erro ocorreu no lado do client
      errorMessage = error.error.message;
    } else {
      // Erro ocorreu no lado do servidor
      errorMessage = `Código do erro: ${error.status}, ` + `menssagem: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
