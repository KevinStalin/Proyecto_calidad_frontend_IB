import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../service/api.service';
import { NgForm, NgModel } from '@angular/forms';
//***I mportavciones que requiero para escuchar en nombre */
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  //inicializar el controlador del input 
  //primer valor por defecto vacio y con algo 
  //primer array validaciones sincronas,segundo validaciones asincronas
  emailCrl = new FormControl('', []);
  loginuser:loginUser={
    correo:'',
    password:'',
  }

  constructor(public data: ApiService) {
    this.emailCrl.valueChanges
      .pipe(debounceTime(400))
      .subscribe(
        valor => {
          console.log(valor);
          this.data.getCIuser(valor)
            .subscribe(
              res => {
                console.log('SR->', res);
                this.data.codigos=res;
              }
            );
        }
      );
  }

  ngOnInit(): void {
    this.getUsuario();
  }

  getUsuario() {
    this.data.getAllData().subscribe(
      res => {
        this.data.usuarios = res;
      },
      err => console.log(err)
    );
  }

  addUser(form: NgForm) {
    this.data.createUser(form.value).subscribe(
      res => {
        console.log(res);
        this.getUsuario();
        form.reset();
      },
      err => console.log(err)
    );
    console.log(form.value);

  }

  numero_1(numero:number){
    // NgModel=this.data.codigoSelect.n1=numero;
    return  this.data.codigoSelect.n1=numero;
  }
  numero_2(numero:number){
    return this.data.codigoSelect.n2=numero;
  }
  numero_3(numero:number){
    return this.data.codigoSelect.n3=numero;
  }

  getCodeForm(numero:number){
    console.log(numero);
    let ob1={

    }
    
    this.data.codigoSelect.n2=numero;
    this.data.codigoSelect.n3=numero;
  }
  addUser2() {
    let loginuser2={
      numero1:this.data.codigoSelect.n1,
      numero2:this.data.codigoSelect.n2,
      numero3:this.data.codigoSelect.n3
    }
    // console.log(loginuser2);
    // console.log(this.loginuser);
    let json_final=Object.assign(loginuser2,this.loginuser);
    console.log('F-->',json_final);
    this.data.autentifica(json_final)
    .subscribe(
      res=>console.log(res),
      err=>console.log(err)
    );
  }

}
interface loginUser{
  correo:string;
  password:string;
}
