import { Component, OnInit } from '@angular/core';
import { ListcochesService } from 'src/app/services/list-coches.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lista-coches',
  templateUrl: './lista-coches.component.html',
  styleUrls: ['./lista-coches.component.css'],
  providers: [ListcochesService]
})
export class ListaCochesComponent implements OnInit {
  totalCars: number = 0;
  page: number = 1;
  limit: number = 4;
  cars: any[] = [];
  paginatedCars: any[] = [];
  sortField: string = '';
  sortOrder: string = 'asc';
  selectedCars: any[] = [];
  
  constructor(
    private _listcochesService: ListcochesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cargarData();
  }

  onPageChange(page: number): void {
    this.page = page;
    this.sortAndPaginate();
  }

  getTotalPages(): number {
    return Math.ceil(this.totalCars / this.limit);
  }

  public cargarData(): void {
    this._listcochesService.getcoches().subscribe({
      next: data => {
        this.cars = data;
        this.totalCars = data.length;
        this.sortAndPaginate(); // Llamar a sortAndPaginate después de cargar los datos
      },
      error: error => {
        console.error('Error fetching cars', error);
      }
    });
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

  toggleCompare(car: any): void {
    const index = this.selectedCars.findIndex(selectedCar => selectedCar._id === car._id);
    if (index !== -1) {
      this.selectedCars.splice(index, 1);
    } else {
      if (this.selectedCars.length < 2) {
        this.selectedCars.push(car);
      } else {
        alert("Solo puedes comparar dos coches a la vez.");
      }
    }
  }

  private paginateCars(): void {
    const startIndex = (this.page - 1) * this.limit;
    const endIndex = startIndex + this.limit;
    this.paginatedCars = this.cars.slice(startIndex, endIndex);
  }

  public sortAndPaginate(): void {
    this.sortCars();
    this.paginateCars();
  }

  private sortCars(): void {
    if (this.sortField) {
      this.cars.sort((a, b) => {
        const valueA = a[this.sortField];
        const valueB = b[this.sortField];
        if (this.sortOrder === 'asc') {
          return valueA > valueB ? 1 : -1;
        } else {
          return valueA < valueB ? 1 : -1;
        }
      });
    }
  }

  navigateToCompare(): void {
    if (this.selectedCars.length === 2) {
      this.router.navigate(['/comparar'], { state: { cars: this.selectedCars } });
    } else {
      alert("Selecciona dos coches para comparar.");
    }
  }
  deleteCar(id: string): void {
    if (confirm("¿Estás seguro de eliminar este coche?")) {
      this._listcochesService.deletecoche(id).subscribe({
        next: () => {
          // Actualizar la lista de coches después de eliminar
          this.cargarData();
        },
        error: error => {
          console.error('Error deleting car', error);
        }
      });
    }
  }

  // Sorting methods
  precioasc(): void { this.sort('precio', 'asc'); }
  maleteroasc(): void { this.sort('maletero', 'asc'); }
  kmasc(): void { this.sort('km', 'asc'); }
  potenciaasc(): void { this.sort('potencia', 'asc'); }

  precio(): void { this.sort('precio', 'desc'); }
  maletero(): void { this.sort('maletero', 'desc'); }
  km(): void { this.sort('km', 'desc'); }
  potencia(): void { this.sort('potencia', 'desc'); }

  private sort(field: string, order: string): void {
    this.sortField = field;
    this.sortOrder = order;
    this.page = 1; // Reset to first page after sorting
    this.sortAndPaginate();
  }
}
