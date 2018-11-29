import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../../models/usuario.model';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import 'rxjs/add/operator/map';

@Injectable()
export class UsuarioService {

  usuario: Usuario;
  token: string;

  constructor( public http: HttpClient, public router: Router) {
    this.loadLs();
   }

  isLogin(): boolean {
    return ( this.token.length > 5) ? true : false;
  }

  loadLs() {
    if ( localStorage.getItem('token') ) {
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse(localStorage.getItem('usuario'));
    } else {
      this.token = '';
      this.usuario = null;
    }
  }

  saveLs( id: string, token: string, usuario: Usuario) {

    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario));

    this.usuario = usuario;
    this.token = token;
  }

  logout() {
    this.usuario = null;
    this.token = '';
    // localStorage.clear();
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    this.router.navigate(['/login']);

  }

  loginGoogle( token: string ) {
    const url = environment.URL_SERVICIOS + '/login/google';

    return  this.http.post( url, {token} )
            .map( (resp: any) => {
              this.saveLs( resp.id, resp.token, resp.usuario );
              return true;
            });
  }

  login( usuario: Usuario, recordar: boolean = false) {

    if ( recordar ) {
      localStorage.setItem('email', usuario.email);
    } else {
      localStorage.removeItem('email');
    }

    const url = environment.URL_SERVICIOS + '/login';

    return this.http.post( url, usuario)
          .map( (resp: any) => {
            this.saveLs( resp.id, resp.token, resp.usuario );
            return true;
          });
  }

  crearUsuario( usuario: Usuario ) {

    const url = environment.URL_SERVICIOS + '/usuario';

    return this.http.post( url, usuario)
    .map( (resp: any) => {
      swal('Usuario creado', usuario.email, 'success')
      return resp.usuario;
    });


  }

}
