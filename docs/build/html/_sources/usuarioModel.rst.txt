Modelo registros:
===============

Para los modelos se usaron dos interfaces:


#. La primera interfaz se llamo "RegistrosI" modelo en el que se declaran cada uno de los atributos requeridos de un "usuario".

.. code-block::
   
                export interface RegistrosI{
                
                photoUrl?: string;   
                nombres: string;
                apellidos: string;
                cedula: number;
                email: string;
                fechaNacimiento: string;
                direccion: string;
                ciudad: string;
                departamento: string;
                pais:string;
                codigoPostal:string;
                profesion: string;
                habilidades: string;
                descripcion:string;

                }

Este modelo es necesario para su uso en los componentes Mi Perfil, Registro y Registros, donde son creados, listados y/o editados.


#. La segunda interfaz se llamo "ContactosI" modelo en el que se declaran cada uno de los atributos requeridos para los campos del componente "Contacto".

.. code-block::
   
                export interface ContactosI{
                
                    
                    nombresCompleto: string;  
                    email: string;
                    motivo: string;
                    mensaje: string;    
                
                }

Este modelo es necesario para su uso en el componente Contacto.

