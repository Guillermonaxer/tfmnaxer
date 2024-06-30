import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:frontendtfm/signup.dart';
import 'package:frontendtfm/dashboard.dart';
import 'package:frontendtfm/user.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:http/http.dart' as http;

class Signin extends StatefulWidget {
  Signin({Key? key}) : super(key: key);

  @override
  _SigninState createState() => _SigninState();
}

class _SigninState extends State<Signin> {
  final _formKey = GlobalKey<FormState>();
  String errorMessage = '';

  Future save() async {
    try {
      print('Enviando solicitud...');
      var res = await http.post(
        Uri.parse("http://192.168.1.134:4001/api/login/login"), // Verifica que esta URL sea correcta
        headers: <String, String>{
          'Content-Type': 'application/json; charset=UTF-8',
        },
        body: jsonEncode(<String, String>{
          'email': user.email,
          'contrasena': user.password, // Asegúrate de que el campo sea el mismo que en el backend
        }),
      );
      print('Respuesta recibida: ${res.statusCode}');
      print('Cuerpo de la respuesta: ${res.body}');

      if (res.statusCode == 200 || res.statusCode == 400) {
        Map<String, dynamic> body = jsonDecode(res.body);
        if (body['error'] != null) {
          setState(() {
            errorMessage = "Datos incorrectos"; // Mostrar mensaje de error específico
          });
        } else {
          // Guardar el token JWT (opcional, dependiendo de tu flujo de autenticación)
          String token = body['token'];
          // Navegar al dashboard
          Navigator.push(
            context,
            MaterialPageRoute(builder: (context) => Dashboard()),
          );
        }
      } else {
        setState(() {
          errorMessage = 'Error de conexión: Código ${res.statusCode}';
        });
      }
    } catch (e) {
      print('Error de conexión: $e');
      setState(() {
        errorMessage = 'Error de conexión: $e'; // Error genérico de conexión
      });
    }
  }

  User user = User('', '', '', '');
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SafeArea(
        child: Stack(
          children: [
            Container(
              alignment: Alignment.center,
              child: SingleChildScrollView(
                child: Form(
                  key: _formKey,
                  child: Column(
                    mainAxisAlignment: MainAxisAlignment.start,
                    crossAxisAlignment: CrossAxisAlignment.center,
                    children: [
                      SizedBox(
                        height: 100,
                      ),
                      Text(
                        "Login",
                        style: GoogleFonts.pacifico(
                            fontWeight: FontWeight.bold,
                            fontSize: 50,
                            color: Colors.blue),
                      ),
                      SizedBox(
                        height: 25,
                      ),
                      Padding(
                        padding: const EdgeInsets.all(16.0),
                        child: TextFormField(
                          controller: TextEditingController(text: user.email),
                          onChanged: (value) {
                            user.email = value;
                          },
                          decoration: InputDecoration(
                              icon: Icon(
                                Icons.email,
                                color: Colors.blue,
                              ),
                              hintText: 'Email',
                              enabledBorder: OutlineInputBorder(
                                  borderRadius: BorderRadius.circular(16),
                                  borderSide: BorderSide(color: Colors.blue)),
                              focusedBorder: OutlineInputBorder(
                                  borderRadius: BorderRadius.circular(16),
                                  borderSide: BorderSide(color: Colors.blue)),
                              errorBorder: OutlineInputBorder(
                                  borderRadius: BorderRadius.circular(16),
                                  borderSide: BorderSide(color: Colors.red)),
                              focusedErrorBorder: OutlineInputBorder(
                                  borderRadius: BorderRadius.circular(16),
                                  borderSide: BorderSide(color: Colors.red))),
                        ),
                      ),
                      Padding(
                        padding: const EdgeInsets.all(16.0),
                        child: TextFormField(
                          controller: TextEditingController(text: user.password),
                          onChanged: (value) {
                            user.password = value;
                          },
                          obscureText: true,
                          decoration: InputDecoration(
                              icon: Icon(
                                Icons.vpn_key,
                                color: Colors.blue,
                              ),
                              hintText: 'Contraseña',
                              enabledBorder: OutlineInputBorder(
                                  borderRadius: BorderRadius.circular(16),
                                  borderSide: BorderSide(color: Colors.blue)),
                              focusedBorder: OutlineInputBorder(
                                  borderRadius: BorderRadius.circular(16),
                                  borderSide: BorderSide(color: Colors.blue)),
                              errorBorder: OutlineInputBorder(
                                  borderRadius: BorderRadius.circular(16),
                                  borderSide: BorderSide(color: Colors.red)),
                              focusedErrorBorder: OutlineInputBorder(
                                  borderRadius: BorderRadius.circular(16),
                                  borderSide: BorderSide(color: Colors.red))),
                        ),
                      ),
                      Padding(
                        padding: EdgeInsets.fromLTRB(55, 16, 16, 0),
                        child: Container(
                          height: 50,
                          width: 400,
                          child: FloatingActionButton(
                            shape: RoundedRectangleBorder(
                                borderRadius: BorderRadius.circular(16.0)),
                            onPressed: () {
                              save();
                            },
                            child: Text(
                              "Iniciar sesión",
                              style: TextStyle(color: Colors.black, fontSize: 20),
                            ),
                          ),
                        ),
                      ),
                      Padding(
                        padding: const EdgeInsets.fromLTRB(95, 20, 0, 0),
                        child: Row(
                          children: [
                            Text(
                              "No tienes cuenta ? ",
                              style: TextStyle(
                                  color: Colors.black,
                                  fontWeight: FontWeight.bold),
                            ),
                            InkWell(
                              onTap: () {
                                Navigator.push(
                                    context,
                                    new MaterialPageRoute(
                                        builder: (context) => Signup()));
                              },
                              child: Text(
                                "Registrate",
                                style: TextStyle(
                                    color: Colors.blue,
                                    fontWeight: FontWeight.bold),
                              ),
                            ),
                          ],
                        ),
                      ),
                      errorMessage.isNotEmpty
                          ? Padding(
                        padding: const EdgeInsets.all(16.0),
                        child: Text(
                          errorMessage,
                          style: TextStyle(color: Colors.red),
                        ),
                      )
                          : Container(),
                    ],
                  ),
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
