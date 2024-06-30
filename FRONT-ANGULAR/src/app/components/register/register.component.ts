import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [UserService] // Aquí se proporciona el servicio UserService a este componente
})
export class RegisterComponent implements OnInit {
  public user: User;

  constructor(private _userService: UserService) {
    this.user = new User('', '', '', ''); // Inicialización de un nuevo objeto User
  }

  ngOnInit() {
    console.log('Componente de registro inicializado');
  }

  onSubmit(form: any) {
    this._userService.register(this.user).subscribe(
      {next:response => {
        console.log('Respuesta del servidor:', response);
        form.reset(); // Reiniciar el formulario después de enviar los datos correctamente
      },error:
      error => {
        console.error('Error al registrar usuario:', error);
      }}
    );
  }
}
