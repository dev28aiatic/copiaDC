Video
============================


.Descripción
------------

En esta sección se explicará como embeber un vídeo en nuestro aplicativo web usando html/css

.Importaciones
--------------

No se realizan exportaciones para poder embeber el vídeo 

.Desarrollo
------------

El HTML/CSS es compuesto po un contenedor que utiliza el fxFlex para mejorar la parte de responsividad y se utiliza iFrame para embeber el vídeo de nuestro gusto

.. code-block::


   <div class="content" fxLayout="row wrap" fxLayoutGap="16px grid" fxLayoutAlign="center center">
    <div fxFlex="30%" fxFlex.xs="100%" fxFlex.sm="33%">
        <h2>Bienvenidos somos el equipo DC</h2>
        <div class="videoWrapper">
            <!-- Copy & Pasted from YouTube -->
            <iframe width="560" height="315" src="https://www.youtube.com/embed/y_m7VsA73Y0" frameborder="0" 
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
      
      </div>
    </div>

Estas serían las reglas de nuestro CSS las cuales posicionan el video que hemos embebido, le entregamos posiciones y tamaños junto con el padding y su respectivo alineamiento de contenido

.. code-block::

   .videoWrapper {
     position: relative;
     padding-bottom: 56.25%; /* 16:9 */
     padding-top: 25px;
     height: 0;
     }
   .videoWrapper iframe {
     position: absolute;
     padding: 16px;
     top: 0;
     left: 0;
     width: 70%;
     height: 70%;
     align-content: center;
    }


dentro de nuestro video.component, creamos una variable que será un tag, el cual nos permitirá crear un elemento, este tag se le entregará la url del api de youtube que es esencial para el funcionamiento del vídeo

.. code-block::
    ngOnInit(): void {

    const tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    document.body.appendChild(tag);
    }



   