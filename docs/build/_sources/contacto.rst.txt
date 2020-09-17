Contacto
==================


En este módulo creamos el formulario y los métodos necesarios para enviar un correo de contacto entre un usuario interesado en los servicios de Marvel Project y su CEO, a través de un correo electrónico el CEO recibirá toda la información que será proporcionada por el usuario/visitante de la página.
La estructura del Modulo es la siguiente:

.. image :: ../images/ContactoDoc01.png

Dentro de estos archivos, el routing module & contacto.spec.ts no son modificados y son generados automáticamente por el Angular CLI.
La estructura HMTL del formulario y la página de contacto es la siguiente

.. code-block::
   
   <div class="container">
   <div class="column">
   <form
      [formGroup]="contactanosForm"
      (ngSubmit)="guardar()"
      method="POST"
      class="formxD">
      <p>
        <mat-form-field
          appearance="outline"
          style="text-align: center"
          class="formItem">
          <label class="label">Nombre</label>
          <input
            formControlName="nombre"
            type="text"
            matInput
            placeholder="Tu nombre completo"
            required
          />
        </mat-form-field>
      </p>

      <p>
        <mat-form-field
          appearance="outline"
          style="text-align: center"
          class="formItem"
        >
          <label class="label">Correo electronico</label>
          <input
            formControlName="email"
            type="text"
            matInput
            placeholder="Tu correo electronico"
            required
            (change)="change()"
          />
          <mat-error
            *ngIf="
              contactanosForm.get('email').hasError('pattern') &&
              !contactanosForm.get('email').hasError('required')
            "
          >
            Por favor digita un correo electronico valido
          </mat-error>
          <mat-error *ngIf="contactanosForm.get('email').hasError('required')">
            El email es <strong>requerido</strong>
          </mat-error>
        </mat-form-field>
      </p>
      <p>
        <mat-form-field
          appearance="outline"
          class="formItem"
          style="text-align: center"
        >
          <mat-label class="titulo">Motivo</mat-label>
          <br />
          <mat-form-field style="text-align: center; width: 90%">
            <mat-label>Tu motivo</mat-label>
            <mat-select formControlName="motivo" matInput required>
              <mat-option [disabled]="true">Seleccionar</mat-option>
              <mat-option *ngFor="let motivo of motivos" [value]="motivo">{{
                motivo
              }}</mat-option>
            </mat-select>
            <mat-hint></mat-hint>
          </mat-form-field>
        </mat-form-field>
      </p>
      <br />
      <br />
      <p>
        <mat-form-field
          appearance="outline"
          style="text-align: center"
          class="formItem"
        >
          <mat-label class="titulo">Mensaje</mat-label>
          <mat-form-field style="width: 90%">
            <mat-label>Tu mensaje</mat-label>
            <textarea
              name="mensaje"
              class="textDesc"
              formControlName="mensaje"
              matInput
              placeholder="Tu mensaje"
              required
            >
            </textarea>
          </mat-form-field>
        </mat-form-field>
      </p>

      <div class="btnRegister">
        <button
          mat-button
          class="botonRegis"
          type="submit"
          [disabled]="contactanosForm.invalid"
        >
          <mat-icon class="loginIcon">send</mat-icon><span> Enviar</span>
        </button>
        </div>
        </form>
        </div>
        <div class="column">
         <img src="../../../../assets/CONTACTO.png" class="imagen" />
      </div>
     </div>


Como se puede observar en el código HTML, hacemos la creación de la tabla, con sus respectivos Inputs, su dropdown y la sección de mensaje, junto con las condicionales requeridas para el funcionamiento del correo; y por último el botón de enviar que estará inhabilitado a menos de que todos los campos estén debidamente diligenciados.

A continuación se van a diligenciar todas las reglas de css que le dan estilo a nuestro fomulario:

.. code-block::
   
   .column {
     position: relative;
     height: auto;
     width: 100%;
     top: 0;
     display: block;
     margin: auto;
     margin-bottom: 50px;
     margin-top: 50px;
     //background-color: rgba($color: #d37130, $alpha: 0.2);}

   .btnRegister {
      text-align: center;
      margin-bottom: 70px;}

   .formItem .titulo {
      color: black;}

   .container {
     background-color: rgba($color: #d37130, $alpha: 0.2);
     position: relative;
     height: 100%;
     width: 100%;
     top: 0;
  //display: block;
     margin: auto;
     display: inline-flex;
     justify-content: center;
     align-items: center;
     align-content: center;
     overflow-y: auto;
     margin-bottom: 0;}

   .imagen {
     margin-top: 0.5%;
     margin-right: 0;
     height: 99%;
     width: 99%;
     border-radius: 25px;
     background-color: rgba($color: #d37130, $alpha: 0.2);}

   .formxD {
   //padding: 35px 135px 135px 35px;
    height: 100%;
    width: 90%;
    margin-top: 30px;
    margin-left: 5%; }
   .formItem {
    //margin-top: 20px;
     margin-bottom: 1%;
     font-size: 18px;
     width: 100%;
    //height: 100%;}

    @media only screen and (max-width: 768px) and (max-height: 849px) {
     .imagen {
       height: 0px;
       width: 0px;  } }

   @media only screen and (max-width: 768px) {
     .container {
       display: block;
       margin: auto;  }

     .column {
       display: block;
       margin: auto;  }
    .imagen {
      height: auto;
      display: block;
      position: relative;
      margin-top: 100px;  }}

Se definen todas las reglas para nuestro formulario tanto en versión web como en versión responsiva.
Pasaremos a explicar de manera breve cada uno de las partes que componen el Contacto.Component.ts, este archivo contiene todas importaciones necesarias para crear el formulario y poder trabajar con el Modelo de Contacto, enviar el formulario a la base de datos y usar la Api de Elasticemail para enviar el correo al CEO cada vez que alguien quiera hacer un contacto para discutir sobre nuestros servicios y oportunidades en Marvel Project.

A la par de esto, en nuestro Contacto.Module.ts, hacemos una importanción de todos las librerias y clases que usaremos para trabajar de manera efectiva en contacto.

.. code-block::

   import { Component, OnInit } from '@angular/core';
   import { RequiredValidator, Validators } from '@angular/forms';
   import { FormControl } from '@angular/forms';
   import { FormGroup } from '@angular/forms';
   import { Contactanos } from 'src/app/models/contacto/contactanos.model';
   import { DataBaseService}  from '../../../services/data-base.service';
   import '../../../../assets/js/smtp.js';
   declare let Email: any;


   @Component({
    selector: 'app-contacto',
    templateUrl: './contacto.component.html',
    styleUrls: ['./contacto.component.scss'],
  })

   export class ContactoComponent implements OnInit {
     contactanosForm= new FormGroup({
      nombre: new FormControl(''),
      email:new FormControl('', [/*Validators.email*/,Validators.pattern(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]),
      motivo: new FormControl(''),
      mensaje: new FormControl(''),
    },);

    motivos=['Contratos', 'Proyectos', 'Cobranzas'];



    constructor(private db: DataBaseService) {

    }

    ngOnInit(): void {
    }
    change(){
      console.log(this.contactanosForm);
    }
    //servidor de correos Elasticemail
    
    guardar(){
      const {nombre, email, motivo, mensaje} = this.contactanosForm.value;
      const asunto:string = 'Nos ha contactado '+nombre+' desde Marvel-Project';
      const cuerpo:string = '<table style="width: 900px; margin: auto; border: 1px solid black; table-layout: fixed;"><tr>      <th colspan="2" style="border-bottom:       1px solid black;border-collapse: collapse;">        Contacto desde Marvel-Project      </th>    </tr>    <tr>      <td style="border-right: 1px solid black;       border-bottom: 1px solid black; border-collapse: collapse;  text-align: justify;">Nombre:</td>      <td style=" border-bottom: 1px solid black; border-collapse: collapse;  text-align: justify; word-wrap: break-word;">'+nombre+'</td>    </tr>    <tr>      <td style="border-right: 1px solid black; border-bottom: 1px solid black; border-collapse: collapse;  text-align: justify;">Correo electronico:</td>      <td style="border-bottom: 1px solid black; border-collapse: collapse;  text-align: justify; word-wrap: break-word;">'+email+'</td>    </tr>    <tr>      <td style="border-right: 1px solid black; border-bottom: 1px solid black; border-collapse: collapse;  text-align: justify;">Motivo:</td>      <td style="border-bottom: 1px solid black;  border-collapse: collapse;  text-align: justify; word-wrap: break-word;">'+motivo+'</td>    </tr>    <tr>      <td style="border-right: 1px solid black; border-collapse: collapse;  text-align: justify;">Mensaje:</td>      <td style="border-collapse: collapse;  text-align: justify; word-wrap: break-word;">'+mensaje+'</td>    </tr>  </table>';
      var datos = new Contactanos();
      datos.nombre = nombre;
      datos.email = email;
      datos.motivo = motivo;
      datos.mensaje = mensaje;
      this.db.crearContactanos(datos).then(r=>{
        if (r){
          Email.send({
            Host: 'smtp.elasticemail.com',
            Username: 'dev17@aiatic.com',
            Password: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXX',
            To: 'ceo@aiatic.com',
            From: 'dev17@aiatic.com',
            Subject: asunto,
            Body: cuerpo
          }).then(message =>{
            alert('m'+ message);
          });
          console.log('si');
        }else{
          console.log('no');
        }
      });
    }

  }


Lo primero que se observa, es que hacemos una breves importaciones de librerias y modelos que necesitamos para poder trabajar esta sección de Contacto.
Seguido, iniciamos un nuevo formulario, el cuál recibirá los cuatro datos requeridos.

.. code-block::
   
   export class ContactoComponent implements OnInit {
   contactanosForm= new FormGroup({
    nombre: new FormControl(''),
    email:new FormControl('', [/*Validators.email*/,Validators.pattern(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]),
    motivo: new FormControl(''),
    mensaje: new FormControl(''),
  },);
    motivos=['Contratos', 'Proyectos', 'Cobranzas'];

Hecho esta sección, nuestro formulario ya está listo para poder ser procesado por otros métodos para su envío & cumpliendo con el requerimiento, se crea un array Motivo para que podamos crear el dropdown en nuestro html con las 3 opciones entregadas por el cliente.
Seguido de esto, encontraremos nuestro constructor, el cual inicializará como privado, el servicio de DataBaseService, el cual es el servicio creado para poder manejar los métodos necesarios para procesar información.

.. code-block::
   
     guardar(){
      const {nombre, email, motivo, mensaje} = this.contactanosForm.value;
      const asunto:string = 'Nos ha contactado '+nombre+' desde Marvel-Project';
      const cuerpo:string = '<table style="width: 900px; margin: auto; border: 1px solid black; table-layout: fixed;"><tr>      <th colspan="2" style="border-bottom: 1px solid black;border-collapse: collapse;">        Contacto desde Marvel-Project      </th>    </tr>    <tr>      <td style="border-right: 1px solid black; border-bottom: 1px solid black; border-collapse: collapse;  text-align: justify;">Nombre:</td>      <td style=" border-bottom: 1px solid black; border-collapse: collapse;  text-align: justify; word-wrap: break-word;">'+nombre+'</td>    </tr>    <tr>      <td style="border-right: 1px solid black; border-bottom: 1px solid black; border-collapse: collapse;  text-align: justify;">Correo electronico:</td>      <td style="border-bottom: 1px solid black; border-collapse: collapse;  text-align: justify; word-wrap: break-word;">'+email+'</td>    </tr>    <tr>      <td style="border-right: 1px solid black; border-bottom: 1px solid black; border-collapse: collapse;  text-align: justify;">Motivo:</td>      <td style="border-bottom: 1px solid black;  border-collapse: collapse;  text-align: justify; word-wrap: break-word;">'+motivo+'</td>    </tr>    <tr>      <td style="border-right: 1px solid black; border-collapse: collapse;  text-align: justify;">Mensaje:</td>      <td style="border-collapse: collapse;  text-align: justify; word-wrap: break-word;">'+mensaje+'</td>    </tr>  </table>';
      var datos = new Contactanos();
      datos.nombre = nombre;
      datos.email = email;
      datos.motivo = motivo;
      datos.mensaje = mensaje;
      this.db.crearContactanos(datos).then(r=>{
        if (r){
          Email.send({
            Host: 'smtp.elasticemail.com',
            Username: 'dev17@aiatic.com',
            Password: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXX',
            To: 'ceo@aiatic.com',
            From: 'dev17@aiatic.com',
            Subject: asunto,
            Body: cuerpo
          }).then(message =>{
            alert('m'+ message);
          });
          console.log('si');
        }else{
          console.log('no');
        }
      });
    }




El método guardar() es donde hacemos el llamado de nuestra API de elasticmail. En este método, observamos que se crean unas variables en donde almacenamos los datos de nuestro formulario previamente creado, seguido de la creación de una variable asunto, la cuál en el correo del CEO será tal cual la caja en dónde se especifíca el asunto del correo y el cuerpo, el cuál recibe dentro de la misma variable el estilo que este tendrá cuando el CEO reciba el correo. se crea la variable datos, la cual incializa un objeto de tipo "contactanos". Creamos una condicional para que una vez creado el formulario en la base de datos, se ejecute el envío del correo
 





