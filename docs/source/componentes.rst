Estructura
===============


#. Componentes
    Los componentes en Angular son una combinación de un archivo html con un ts y un scss para algunos darles su estilo, todo esto con el fin de poder
    crear un elemento con caracteristicas propias tanto de comportamiento como de apariencia que se puede mostrar en un navegador.
    
    En esta sección se encuentra la lista de los componentes que posee la aplicación.


    ..  toctree::
        :maxdepth: 1
        
        sidenav
        dialogo
        footer
        home
        registro
        login
        mi Perfil
        equipo
        registros
        video
        contacto
      

#. Material
    Se tiene esta carpeta en donde se recolecta de una manera ordenada un modulo que llame todas los componentes que se requieran, en este
    proyecto se utiliza para dar los estilos con Angular Material, se puede ver mas informacion de cada material usado en el proyecto en esta lista:

    .. toctree::
       
       angularMaterial
      

#. Modelos
    Un modelo se utiliza para definir los tipos de datos que vamos a usar en la aplicación. Son archivos creados a mano,
    que definen un tipo de datos, modelando una serie de atributos que contiene, los modelos utilizados en este proyecto son:

    .. toctree::

       usuarioModel
       contactoModel

#. Servicios
    Un servicio es un proveedor de datos, que mantiene lógica de acceso a ellos y operativa relacionada con la aplicación y las cosas que se hacen con los datos dentro de la misma. 
    Los servicios serán consumidos por los componentes, que delegarán en ellos la responsabilidad de acceder a la información y la realización de operaciones con los datos.
    
    Los servicios utilizados en la aplicación son:


    .. toctree::
       
       auth
       contactoService
       APIREST
       registrosService
       
       

