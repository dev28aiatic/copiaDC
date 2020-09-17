Sidenav
*********


.. image :: ../images/inicio.png


* Descripción
    Este componente contiene el header principal, el menu lateral izquierdo, el menu centrado, el componente en el que se este ubicado 
    el menú lateral izquierdo y el footer. Encargado que en el momento que se necesite hacer la aplicación responsive, oculte los menus.
    El menu lateral izquierdo para la versión responsiva se encuentra oculto y puede hacerse visible al hacer clic en el icono en la parte superior izquierda
    y para el menu central para la versión responsiva se encuentra oculto y puede hacerse visible al hacer clic en el icono ubicado en la parte superior derecha.

* Importaciones
    Para este componente se debe importar los módulos del cdk layout de angular denominados BreakpointObserver y Breakpionts para tener en cuenta los puntos
    de quiebre en la vista web y responsive, un Observable para guardar estas instancias y unos operadores para poder mapear esos resultados.
    Es necesaria la importación del servicio Auth para comocer si hay un usuario con sesión iniciada.
    Se importa Router de angular para redirigir desde los items de los menus.
    ::
        import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
        import { Observable } from 'rxjs';
        import { map, shareReplay } from 'rxjs/operators';
        import { AuthService } from '../../services/auth.service';
        import { Router } from '@angular/router';



* Desarrollo
    Se guarda en una variable publica los resultados del Auth, estas son utilizadas mediante condicionales para poder mostrar/ocultar items según sea el estado.
    ::
        //estado del usuario
        public user$: Observable<any> = this.authSvc.afAuth.user;  
        //método para validar si el usuario esta logueado o no
        onCheckUser():void {
            if (this.authSvc.getCurrentUser()==null) {
            this.isLogged=false;
            } else {
            this.isLogged=true;
            }
        }
    

    .. code-block:: html
       :linenos:

        <mat-nav-list>
            <a mat-list-item [routerLink]="['/register']">Registro</a>
            <a mat-list-item [routerLink]="['/login']" >Iniciar Sesión</a>
            <a mat-list-item *ngIf="user$ | async as user" [routerLink]="['/profile']" >Mi perfil</a>
            <a mat-list-item *ngIf="user$ | async as user" [routerLink]="['/records']">Registros</a>
            <a mat-list-item [routerLink]="['/video']">Video</a>
            <a mat-list-item (click)="onLogout()" *ngIf="user$ | async as user">Salir</a>
        </mat-nav-list>

    Se guarda en una variable el resultado del BreakpointObserver, estas son usadas mediante condicionales para poder realizar el cambio de vista web/responsive y viceversa.
    ::
        isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
        .pipe(
        map(result => result.matches),
        shareReplay()
        );


    Se tiene el metodo de cerrar sesión en caso del usuario estar con sesión iniciada y dar clic en salir 
    ::
        //método para salir
        async onLogout(){
            try{
            await this.authSvc.logout();
            this.router.navigate(['/login']);
            }
            catch(error){console.log(error)}
        
        
        }
