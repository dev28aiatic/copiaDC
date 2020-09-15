import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import {ContactosService} from 'src/app/services/contactos.service'

import 'src/assets/smtp.js';
declare let Email: any;

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  //para el formGroup
  contactForm: FormGroup;

  listaContactos;

  

  // para el selecionar le motivo
  motivos= [
    {value: 'Contratos' },
    {value: 'Proyectos'},
    {value: 'Cobranzas'}
  ];
  motivoSeleccionado:string;

  constructor(
    //para el formulario
    private fb:FormBuilder,
    private contactosService:ContactosService,
  ) {

    this.contactForm= this.fb.group({

      nombreCompleto: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email, /*this.validarEmail*/]),
      motivo: new FormControl('', [Validators.required]),
      mensaje: new FormControl('', [Validators.required]),

    });

    

   }

  ngOnInit(): void {

    this.contactForm.setValue({

      nombreCompleto: '', 
      email: '', 
      motivo: '',
      mensaje: ''

    });
    this.getRegistros();
  }

  getRegistros(){

    this.contactosService.getContactos().subscribe((rgSnapshot) => {
      this.listaContactos = [];
      rgSnapshot.forEach((rgData: any) => {
        this.listaContactos.push({
          id: rgData.payload.doc.id,
          data: rgData.payload.doc.data()

        });
      })

      console.log(this.listaContactos);
      

    });

    
  }

  //metodo para informar errores en el campo de email
  errorEmail() {
    if (this.contactForm.controls.email.hasError('required')) {
      return 'Debe ingresar un email';
    }
    if (this.contactForm.controls.email.hasError('ms')) {
      return 'El email ya ha sido registrado';
    }
    return this.contactForm.controls.email.hasError('email') ? 'Email no válido' : '';
  }

  oncreate(form){
    //contraseña 23F329DDAEFBBEC236806EE66626F22F5AAA

    this.contactosService.crearContacto(this.contactForm.value).then(() => {

      //toco importar en el archivo angular.json ln 34 y 99
      //"scripts": ["src/assets/smtp.js"]    
      //tomado de https://medium.com/javascript-in-plain-english/send-emails-without-a-server-side-code-with-angular-e227c3e62dbd     
      Email.send({
      Host : 'smtp.elasticemail.com',
      Username : 'dev24@aiatic.com',
      Password : '23F329DDAEFBBEC236806EE66626F22F5AAA',
      To : 'dev28@aiatic.com',//ceo@aiatic.com
      From : 'dev24@aiatic.com',
      Subject : 'Dc Team Nuevo contacto',
      Body : `
            <h1> Nuevo registro de Contacto</h1>
            <p></p>
            <h3> Nombre: ${this.contactForm.controls.nombreCompleto.value}</h3>
            <h3> Correo: ${this.contactForm.controls.email.value}</h3>
            <h3> Motivo: ${this.contactForm.controls.motivo.value}</h3>
            <h3> Mensaje</h3>
            <p>${this.contactForm.controls.mensaje.value}</p> 
      
      `
      }).then( message => {
        alert(message); 
       } );


      this.contactForm.setValue({

        nombreCompleto: '', 
        email: '', 
        motivo: '',
        mensaje: ''
  
      });
      
    }, (error) => {
      console.error(error);
    }); 
  }

  

}
