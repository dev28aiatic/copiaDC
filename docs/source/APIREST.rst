Servicio Municipios
***************************


Este servicio es invocado para auxiliar a los módulos que requieran la utilización del arreglo de Municipios y Departamentos de Colombia.


.. code-block::

               import { Injectable } from '@angular/core';
               //Para manejo de llamadas a apis con este modulo no necesitas usar fetch ni ajax
               import { HttpClient } from "@angular/common/http";
               import { Observable } from 'rxjs/internal/Observable';

               @Injectable({
               providedIn: 'root'
               })
               export class MunicipiosColombiaService {

               //inyecto el httpClient
               constructor( private http: HttpClient) { 

               }

               //metodos
               getDatos():Observable<any>{

               return this.http.get("https://www.datos.gov.co/resource/xdk5-pm3f.json");

               }


               }



