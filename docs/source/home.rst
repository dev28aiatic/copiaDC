Inicio
********************


.. image :: ../images/homeweb.JPG
Inicio para versión web


.. image :: ../images/homemovil.JPG
Inicio para versión movil


* Descripción
    En esta sección se muestra información de los desarrolladores. 


* Importaciones
    Para este componente se debe importar el módulo de Angular Material para las tarjetas de cada 
    integrante del equipo.
    ::
        import { MaterialModule } from 'src/app/material/material.module';


* Desarrollo
    El MatCard permite agregar una imagen y un texto en este caso los datos del desarrollador dentro de un mat-grid, donde tenemos 2 columnas, una para cada mat-grid-tile por desarrollador.


.. code-block:: html
       :linenos:

        <mat-grid-list cols="2" rowHeight="1:1" >

            <!--grid tile para cada tarjeta-->
            <mat-grid-tile [colspan]="1" [rowspan]="1" >
                <!--card ronal-->
                <mat-card class="card-persona" fxFlex="0 0 50%">
                <img mat-card-image src="../../../assets/ronal2.jpg">
                <mat-card-content>
                    <p>Ronal Landazabal</p>
                </mat-card-content>
                </mat-card>
            </mat-grid-tile>

            <!--card karen-->
            <mat-grid-tile [colspan]="1" [rowspan]="1">
                <mat-card class="card-persona" fxFlex="0 0 50%">
                <img mat-card-image src="../../../assets/karen.jpg">
                <mat-card-content>
                    <p>Karen Gómez</p>
                </mat-card-content>
                </mat-card>
            </mat-grid-tile>

        </mat-grid-list>