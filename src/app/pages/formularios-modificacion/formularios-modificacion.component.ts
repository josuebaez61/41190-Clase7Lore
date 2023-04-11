import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-formularios-modificacion',
  templateUrl: './formularios-modificacion.component.html',
  styleUrls: ['./formularios-modificacion.component.scss'],
})
export class FormulariosModificacionComponent {
  [x: string]: any;
  constructor(
    private service: LocalStorageService,
    private dialog: MatDialogRef<FormulariosModificacionComponent>
  ) {}

  nombreControl = new FormControl('', Validators.required);
  apellidoControl = new FormControl('', Validators.required);
  dniControl = new FormControl('', [
    Validators.required,
    Validators.minLength(8),
  ]);
  emailControl = new FormControl('', [Validators.required, Validators.email]);
  paisControl = new FormControl('', Validators.required);

  FormularioRegistro = new FormGroup({
    nombre: this.nombreControl,
    apellido: this.apellidoControl,
    dniControl: this.dniControl,
    emailControl: this.emailControl,
    paisControl: this.paisControl,
  });

  modificar() {
    if (this.FormularioRegistro.status === 'INVALID') return;

    let alumno = {
      nombre: this.FormularioRegistro.get('nombre')?.value,
      apellido: this.FormularioRegistro.get('apellido')?.value,
      dni: this.FormularioRegistro.get('dni')?.value,
      email: this.FormularioRegistro.get('email')?.value,
      pais: this.FormularioRegistro.get('pais')?.value,
    };

    if (this.service.obtenerAlumno(+alumno.dni!)!.dni === +alumno.dni!) return;

    //this.service.eliminarAlumno(alumno);
    this.service.agregarAlumno(alumno);
    this.dialog.close();
  }
}
