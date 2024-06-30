import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-comparar',
  templateUrl: './comparar.component.html',
  styleUrls: ['./comparar.component.css']
})
export class CompararComponent implements OnInit {
  cars: any[] = [];

  constructor(private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    this.cars = navigation?.extras?.state?.['cars'] || [];
  }

  ngOnInit(): void {
    if (this.cars.length !== 2) {
      alert('Necesitas seleccionar dos coches para comparar.');
      this.router.navigate(['/listadocoches']);
    }
  }

  getImageUrl(car: any): string {
    return `data:${car.imagen.contentType};base64,${this.arrayBufferToBase64(car.imagen.data.data)}`;
  }

  arrayBufferToBase64(buffer: ArrayBuffer): string {
    let binary = '';
    const bytes = new Uint8Array(buffer);
    for (let i = 0; i < bytes.byteLength; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  }
}
