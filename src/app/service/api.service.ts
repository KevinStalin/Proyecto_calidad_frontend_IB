import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  URL_API = 'http://localhost:3000/API';

  usuarios!: usuario[];
  userSelect: usuario = {
    cedula: undefined,
    nombre: '',
    apellido: '',
    correo: '',
    nombreUsuario: '',
    password: '',
    telefono: '',
    direccion: '',
    fechaNacimiento: '',
    codigoPostal: undefined,
    tipoSangre: '',
    sexo: '',
    religion: '',
    oficio: '',
    numero1: 0,
    numero2: 0,
    numero3: 0,
  };
  codigos!: codigo[];
  codigoSelect: codigo = {
    n1: 0,
    n2: 0,
    n3: 0,
  };

  constructor(private http: HttpClient) { }

  //metodo para traer todos los usuarios de la api
  getAllData() {
    return this.http.get<usuario[]>(this.URL_API + '/con');
  }
  //metodo para registrar los usuarios
  createUser(user: usuario) {
    return this.http.post(this.URL_API + '/registro', user);
  }
  //metodo consultar el codigo del usuario en el login 
  getCIuser(nombre: string) {
    return this.http.get<codigo[]>(this.URL_API + '/consultaCodigo/' + nombre);
  }
  //metodo par logearse 
  autentifica(user: any) {
    return this.http.post(this.URL_API + '/login', user);
  }


}
interface usuario {
  cedula?: number,
  nombre: string,
  apellido: string,
  correo: string,
  nombreUsuario: string,
  password: string,
  telefono: string,
  direccion: string,
  fechaNacimiento: string,
  codigoPostal?: number,
  tipoSangre: string,
  sexo: string,
  religion: string,
  oficio: string,
  numero1: number,
  numero2: number,
  numero3: number,
}
interface codigo {
  n1: number,
  n2: number,
  n3: number,
}