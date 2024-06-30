import 'package:flutter/material.dart';
import 'package:frontendtfm/cars.dart';
import 'package:frontendtfm/crear_coche.dart';
import 'package:frontendtfm/signin.dart'; // Importa el archivo donde está definido el Signin

void main() {
  runApp(Dashboard());
}

class Dashboard extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Navigation Example',
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: HomeScreen(),
      routes: {
        '/screen1': (context) => Cars(),
        '/screen2': (context) => NuevoCoche(), // Cambiado a Screen2 en lugar de NuevoCoche
      },
    );
  }
}

class HomeScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Comparador de coches'),
        actions: <Widget>[
          IconButton(
            icon: Icon(Icons.logout),
            onPressed: () {
              Navigator.pushReplacement(
                context,
                MaterialPageRoute(builder: (context) => Signin()),
              );
            },
          ),
        ],
      ),
      body: Stack(
        children: <Widget>[
          Container(
            decoration: BoxDecoration(
              image: DecorationImage(
                image: AssetImage('assets/images/background.jpg'),
                fit: BoxFit.cover,
              ),
            ),
          ),
          Center(
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: <Widget>[
                ElevatedButton(
                  onPressed: () {
                    Navigator.pushNamed(context, '/screen1');
                  },
                  child: Text('Listado de coches'),
                ),
                ElevatedButton(
                  onPressed: () {
                    Navigator.pushNamed(context, '/screen2');
                  },
                  child: Text('Crear nuevo coche'),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}




