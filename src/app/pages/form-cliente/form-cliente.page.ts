import { Component, OnInit, EventEmitter } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ClienteService } from 'src/app/services/cliente.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form-cliente',
  templateUrl: './form-cliente.page.html',
  styleUrls: ['./form-cliente.page.scss'],
})
export class FormClientePage implements OnInit {

  

  formularioCliente = this.formBuilder.group({
    nombre: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    direccion: new FormControl('', [Validators.required]),
    telefono: new FormControl('', [Validators.required]),
  })

  constructor(private formBuilder: FormBuilder,
    private router: Router,
  private clienteSrv: ClienteService) { }

  ngOnInit() {
  }

  crearCliente(){
    console.log(this.formularioCliente.value)
    this.clienteSrv.crearCliente(this.formularioCliente.value).subscribe(resp => {
      console.log(resp)
      
      this.router.navigateByUrl('/tabs/tab1');
    })
  }

}
