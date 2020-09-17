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
      

#. Angular material
    Angular Material es una biblioteca de componentes de UI para desarrolladores de Angular JS. Se utilizo para la contrucción de los 
    componentes y hacerlos mas atractivos, consistentes y funcionales. 
    
    Se creo un modulo como practica de orden y facilidad en el momento de hacer las importaciones de los modulos para el uso
    de Material, las cuales fueron las siguientes:.
    :: 
        import {MatButtonModule} from '@angular/material/button';
        import {MatCardModule} from'@angular/material/Card';
        import { MatFormFieldModule } from '@angular/material/form-field';
        import {MatSelectModule} from '@angular/material/select';
        import { MatInputModule} from '@angular/material/input';
        import {MatIconModule} from '@angular/material/icon';
        import { MatDatepickerModule} from '@angular/material/datepicker';
        import { MatNativeDateModule } from '@angular/material/core';
        import { MatCheckboxModule } from '@angular/material/checkbox';
        import {MatListModule} from '@angular/material/list';
        import { MatDialogModule } from '@angular/material/dialog';
        import { MatToolbarModule} from '@angular/material/toolbar';
        import { MatSidenavModule } from '@angular/material/sidenav';
        import { MatGridListModule } from '@angular/material/grid-list';
        import { MatTableModule } from '@angular/material/table';
        import { MatSortModule } from '@angular/material/sort';
        import { MatProgressBarModule } from '@angular/material/progress-bar';
        import { MatMenuModule } from '@angular/material/menu';
        import {MatAutocompleteModule} from '@angular/material/autocomplete';
      



.. modelos


#. Modelos

    .. toctree::
       usuarioModel

#. Servicios
    Un servicio es un proveedor de datos, que mantiene lógica de acceso a ellos y operativa relacionada con la aplicación y las cosas que se hacen con los datos dentro de la misma. 
    Los servicios serán consumidos por los componentes, que delegarán en ellos la responsabilidad de acceder a la información y la realización de operaciones con los datos.
    
    Los servicios utilizados en la aplicación son:




    .. toctree::
       APIREST
       auth
       datos-municipio
       

