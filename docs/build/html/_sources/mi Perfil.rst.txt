Perfil
****************


.. image :: ../images/perfilweb.JPG
Perfil para versión web


.. image :: ../images/perfilmovil.JPG
Perfil para versión movil


* Descripción
    Esta sección requiere haber iniciado sesión dentro de la aplicacion, en esta se muestra la información que el usuario suministro en 
    en su registro, adicional a esto, el usuario puede ver su foto de perfil, la cual inicialmente es determinada por defecto pero es posible 
    cambiarla precionando el icono de cambiar imagen. 


* Importaciones
    Para este componente se debe importar el módulo de Angular Material en el ngModule de perfil.
    Es necesario la importación del Angular FireAuth para conocer el usuario en sesión y el RegistrosService para buscar la 
    información de ese usuario en la base de datos. 
    Se importa el servicio de los municipios de colombia para poder utilizar la API para el autocompletado.
    Se importa el servicio de AngularFireStorage para la correcta modificación de la imagen del usuario.
    ::

        import { RegistrosService } from 'src/app/services/registros.service';
        import { AngularFireAuth } from '@angular/fire/auth';
        import {MunicipiosColombiaService} from 'src/app/services/municipios-colombia.service';
        import { AngularFireStorage } from '@angular/fire/storage';      


* Desarrollo
    Este componente permite visualizar y editar la información del usuario actualmente logueado mediante el metodo getRegistros, adicionalmente el cambiar imagen permite 
    subir al firestore una nueva foto y actualizar el link de la ruta en la infromación del usuario de la base de datos con el metodo upload que se tiene el componente principal.
    Ambos metodos utilizados en el onInit()
    ::
       
       //metodo para subir la imagen al storage
        onUpload(e){
            //console.log('subir', e);
            //generar un id unico para la imagen   
            const id = Math.random().toString(36).substring(2);
            //aqui se tiene el archivo
            const file = e.target.files[0];
            
            const filePath = `uploads/profile_${id}`;
            //ruta del fichero
            const ref = this.storage.ref(filePath);
            //se realiza la subida del fichero
            const task = this.storage.upload(filePath,file);

            this.uploadPercent = task.percentageChanges();

            //obtiene el tamaño de la imagen y lo pasa a MB
            const Filesize = e.target.files[0].size/1024/1024;
            if (Filesize>1) {
            alert('El archivo excede el tamaño permitido de 1MB')
            }else{
            //para recuperar la url
            task.snapshotChanges()
            .pipe(
            finalize(() => {
                this.downloadURL = ref.getDownloadURL();
                this.downloadURL.subscribe(url => {
                if (url) {
                    this.urlImage = url;
                    this.editForm.enable();
                    this.editForm.controls.photoUrl.setValue([this.urlImage]);            
                    this.editForm.controls.fechaNacimiento.setValue(this.registroUsuario.data.fechaNacimiento);
                    this.onUpdate(this.editForm.value);

                }
                console.log(this.urlImage);
                });
            })
            ).subscribe();

            }
            

        
        }

        getRegistros(){

            this.registroService.getRegistros().subscribe((rgSnapshot) => {
            this.listaRegistros = [];
            rgSnapshot.forEach((rgData: any) => {
                this.listaRegistros.push({
                id: rgData.payload.doc.id,
                data: rgData.payload.doc.data()

                });
            })

            //console.log(this.listaRegistros);
            this.setDatosFormulario();

            });

            
        }



    Con el boton de editar, permite habilitar los campos de perfil para poder cambiar la información que se encuentra en la base de datos,
    los campos habilitados de cedula validan que al realizar el cambio no se encuentre repetida en la base de datos, los campos de ciudad y departamento
    cuentan con el autocompletado de la API de los municipios de Colombia suministrada por datos del gobierno. El campo de correo electronico se encuntra deshabilitado
    para la edición ya que este es el dato de identificación dentro de la aplicacion.
    ::
       
       //boton de editar
        onEditar(){
            this.editForm.enable();
            //para no cambiar el correo
            this.editForm.get('email').disable();
            this.btnEditarDisabled=true;
            this.editForm.controls.habilidades.setValue([]);
            this.editForm.controls.habilidades.setValidators([Validators.required]);
            this.editForm.controls.habilidades.updateValueAndValidity();
            this.editForm.controls.fechaNacimiento.setValue([]);
            this.editForm.controls.fechaNacimiento.setValidators([Validators.required]);
            this.editForm.controls.fechaNacimiento.updateValueAndValidity();
            
            this.nHabilidaddes=0;
            const habiForm: FormArray = this.checkboxForm.get('habiForm') as FormArray;
                let i=2;
                while (habiForm.controls.length!=0) {
                habiForm.removeAt(i);
                i--;
                }

            //this.checkboxForm.controls.habiForm
            console.log(this.checkboxForm.controls.habiForm);
        }


    Adicional se tiene el autocompletado con los municipios y departamentos de Colombia, validar que no se repita alguna cedula
    ya registrada y validar que no se seleccionen mas de tres habilidades.
    ::
       
       onCheckboxChange(e) {
            const habiForm: FormArray = this.checkboxForm.get('habiForm') as FormArray;
                
            //si lo chuliaron hagrega al array siempre que numero de habilidades menor 4
            if (e.checked && this.nHabilidaddes<=2) {
            
            habiForm.push(new FormControl(e.source.value));        
            this.nHabilidaddes++;
            this.validarHabilidades();
            } else {

            //si numero la habilidad se desmarca elimina habilidad 
            if(e.checked==false)
            {
                const index = habiForm.controls.findIndex(x => x.value === e.source.value);
                habiForm.removeAt(index);
                this.validarHabilidades();
                this.nHabilidaddes--;
            }
            //si numero de habilidades esta al limite (3) no agrega nada y no permite chulear
            else{
                e.source._checked=false;
            }
            }

            //si no hay habilidades selecionadas no habilita el boton
            if(this.nHabilidaddes==0)
            {
            this.editForm.controls.habilidades.setValue([]);
            this.editForm.controls.habilidades.setValidators([Validators.required]);
            this.editForm.controls.habilidades.updateValueAndValidity();
        }
            
        //console.log(this.editForm.controls.habilidades.value);

        }

        // para asignar las habilidades al Formgroup principal
        validarHabilidades(){
            //obtengo los valores de FormGroup
            const ob = this.checkboxForm.value;

            //obtengo el array habForm de ob ostenido de FormGroup
            const { habiForm } = ob;

            //para almacenar las habilidades
            let habilidadesIn: string = '';    

            for (let i = 0; i < habiForm.length; i++) {

            habilidadesIn += habiForm[i] + " / "; // \n 

            }         
            //asigno las habilidaesIn al valor del formcontrol habilidaes para que lo registre en la bd  
            this.editForm.controls.habilidades.setValue([habilidadesIn]);

        }



        
        _filterMunicipios(value: string): string[] {
            const filterValue = value.toLowerCase();

            return this.datosMunicipios.filter(option => option.toLowerCase().includes(filterValue));
        }

        
        _filterDepartamentos(value: string): string[] {
            const filterValue = value.toLowerCase();

            return this.datosDepartamentos.filter(option => option.toLowerCase().includes(filterValue));
        }

        getDatosMuniYDeap(){

            //obtengo los datos del service de departamentos y municipios
            this.municipiosService.getDatos().subscribe(datos =>{
            
            //almaceno todos los municipios
            this.datosMunicipios=datos.map(data=> 
                // del map retorna algo
                data.municipio);

                this.datosDepartamentos=datos.map(data=> 
                // del map retorna algo
                data.departamento);


                //elimino los departamentos repetidos
                let NuevosDatosDepartamentos:string[]=[];

                for (let posicion = 0; posicion < this.datosDepartamentos.length; posicion++) {
                const element = this.datosDepartamentos[posicion];
                
                if(posicion==0)
                {
                    NuevosDatosDepartamentos.push(element.toString());
                }
                else{
                    if(NuevosDatosDepartamentos.includes(element.toString())==false)
                    {
                    NuevosDatosDepartamentos.push(element.toString());
                    }
                }
                }
                
                this.datosDepartamentos=NuevosDatosDepartamentos; 
            });

            

        

        
            this.filteredMunicipios = this.editForm.controls.ciudad.valueChanges
            .pipe(
                startWith(''),
                map(value => this._filterMunicipios(value))
            );


            this.filteredDepartamentos = this.editForm.controls.departamento.valueChanges
            .pipe(
            startWith(''),
            map(value => this._filterDepartamentos(value))
            );


        }

        }


          //Valida la existencia del la C.C en la bd, retorna un boolean
            ValidarExistenciaCedula(cedulaIn: string): boolean {

                let existeCedula: boolean = false;
                let respuesta: boolean = true;

                
                //Obtengo los correos en un array
                for (let i = 0; i < this.listaRegistros.length; i++) {
                const element = this.listaRegistros[i];

                const { cedula } = element.data;

                //excluyo el documento que se va a editar
                if(element.id!= this.registroUsuario.id)
                {
                    if (cedulaIn == cedula) {
                    existeCedula = true;
                    }
                }
                

                
                }
                if (existeCedula == true) {

                console.log('La cedula ingresada ya está registrado');
                //const data={ titulo:'Advertencia', mensaje:'La cedula ingresada ya está registrada'};
                //this.openDialog(data);
                respuesta = true;
                }   
                else {
                respuesta = false;
                }

                return respuesta;

            }


        Y finalmente para guardar los cambios la pagina cuenta con el boton habilitado si se han llenado todos los campos requeridos
        el cual actualizara la información en la base de datos con el metodo update.
        ::
           
           setDatosFormulario(){
    
                for (let index = 0; index < this.listaRegistros.length; index++) {
                const element = this.listaRegistros[index];    
                
                const { email } = element.data;

                if(email==this.UserEmail)
                {        
                    this.registroUsuario=element
                        
                    break;
                }      
                
                };

                //console.log( this.registroUsuario.id );
                //console.log('sdsadadas');
                //console.log( this.documentId );
                //para el id del documento a actualizar
                this.documentId = this.registroUsuario.id;
                this.urlImage=this.registroUsuario.data.photoUrl;
                let editSubscribe = this.registroService.getRegistro(this.documentId).subscribe((registro) => {
                
                
                
                    let myFormattedDate = this.datePipe.transform(registro.payload.data()['fechaNacimiento'].seconds*1000, 'dd/MM/yyyy');
                
                
                
                    
                    

                    this.editForm.setValue({  
                    
                    photoUrl:registro.payload.data()['photoUrl'],
                    nombres: registro.payload.data()['nombres'],
                    apellidos: registro.payload.data()['apellidos'],
                    cedula: registro.payload.data()['cedula'],
                    email: registro.payload.data()['email'],
                    fechaNacimiento: /*registro.payload.data()['fechaNacimiento'],*/myFormattedDate,
                    direccion: registro.payload.data()['direccion'],
                    ciudad: registro.payload.data()['ciudad'],
                    departamento: registro.payload.data()['departamento'],
                    pais: registro.payload.data()['pais'],
                    codigoPostal: registro.payload.data()['codigoPostal'],
                    profesion: registro.payload.data()['profesion'],
                    habilidades: registro.payload.data()['habilidades'],
                    descripcion: registro.payload.data()['descripcion'],
                    });
                    editSubscribe.unsubscribe();
                });
                


            }


            onUpdate(form){

                this.editForm.get('email').enable();
                this.editForm.controls.email.setValue(this.UserEmail);
                //verifica el resultado del metodo verificar existencia de correo 
                if (this.ValidarExistenciaCorreo(this.editForm.get('email').value)  == false && 
                    this.ValidarExistenciaCedula(this.editForm.get('cedula').value) == false ) 
                {
                
            
                

                this.registroService.updateRegistro(this.documentId, this.editForm.value).then(() => {
                
                    this.editForm.disable();
                    this.btnEditarDisabled=false;
                    this.btnGuardarDisabled=true;

                    //para actualizar el correo y contraseña pero esta desabilitado
                    //this.afAuth.auth.currentUser.updateEmail(this.editForm.controls.email.value);
                    //this.afAuth.auth.currentUser.updatePassword(this.editForm.controls.email.value);

                console.log('Documento editado exitósamente');
                }, (error) => {
                    console.log(error);
                });

                }else{

                console.log(" no es valido para el registro");
                

                }


                
            }
                    
            



