import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CrearCocheService } from 'src/app/services/crear-coche.service';
import { MatDialog } from '@angular/material/dialog';
import { PopUpComponent } from 'src/app/pop-up/pop-up.component';
import { Router } from '@angular/router';

@Component({
  selector: 'crear-coche',
  templateUrl: './crear-coche.component.html',
  styleUrls: ['./crear-coche.component.css']
})
export class CrearCocheComponent {
  uploadForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private uploadService: CrearCocheService,
    private dialogRef: MatDialog,
    private router: Router,
  
  ) {
    this.uploadForm = this.fb.group({
      marca: [''],
      modelo: [''],
      precio: [''],
      maletero: [''],
      km: [''],
      potencia: [''],
      cilindrada: [''],
      consumourbano: [''],
      consumoextraurbano: [''],
      traccion: [''],
      imagen: [null]
    });
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.uploadForm.patchValue({ imagen: file });
    }
  }
  openDialog() {
    this.dialogRef.open(PopUpComponent);
  }
  onUpload(): void {
    const formData = new FormData();
    formData.append('marca', this.uploadForm.get('marca')?.value);
    formData.append('modelo', this.uploadForm.get('modelo')?.value);
    formData.append('precio', this.uploadForm.get('precio')?.value);
    formData.append('maletero', this.uploadForm.get('maletero')?.value);
    formData.append('km', this.uploadForm.get('km')?.value);
    formData.append('potencia', this.uploadForm.get('potencia')?.value);
    formData.append('cilindrada', this.uploadForm.get('cilindrada')?.value);
    formData.append('consumourbano', this.uploadForm.get('consumourbano')?.value);
    formData.append('consumoextraurbano', this.uploadForm.get('consumoextraurbano')?.value);
    formData.append('traccion', this.uploadForm.get('traccion')?.value);
    formData.append('imagen', this.uploadForm.get('imagen')?.value);

    this.uploadService.crearCoche(formData).subscribe(
      {
      next:(response: any) => 
        {console.log('File uploaded successfully', response),
        this.openDialog(),
        this.router.navigate(['/listadocoches'])
      }
    ,
      error:(error: any) => 
        console.error('Error uploading file', error)
      }
    );
  }
}