import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';

import 'dashboard.dart';

void main() => runApp(Cars());

class Cars extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Listado de coches',
      theme: ThemeData(primarySwatch: Colors.blue),
      home: MyHomePage(),
      routes: {
        '/dashboard': (context) => Dashboard(),
      },
    );
  }
}

class MyHomePage extends StatefulWidget {
  @override
  _MyHomePageState createState() => _MyHomePageState();
}

class HttpReqService {
  static Future<String> getJson(String url) async {
    var response = await http.get(Uri.parse(url));
    if (response.statusCode == 200) {
      return response.body;
    } else {
      throw Exception('Failed to load data');
    }
  }
}

class _MyHomePageState extends State<MyHomePage> {
  late Future<List<Coche>> _cochesFuture;
  List<Coche> _coches = [];

  @override
  void initState() {
    super.initState();
    _cochesFuture = _getCoches();
  }

  Future<List<Coche>> _getCoches() async {
    try {
      var jsonResponse =
      await HttpReqService.getJson("http://192.168.1.134:4001/api/list_cars");

      List<Coche> coches = [];
      for (var u in jsonDecode(jsonResponse)) {
        coches.add(Coche.fromJson(u));
      }

      return coches;
    } catch (e) {
      print('Error loading cars: $e');
      throw Exception('Failed to load cars: $e');
    }
  }

  void _toggleCocheSelection(Coche coche) {
    setState(() {
      coche.isSelected = !coche.isSelected;
    });
  }

  void _compararCoches(BuildContext context) {
    List<Coche> selectedCoches =
    _coches.where((coche) => coche.isSelected).toList();

    if (selectedCoches.length != 2) {
      _showAlertDialog(context, 'Por favor, seleccione exactamente dos coches.');
    } else {
      Navigator.push(
        context,
        MaterialPageRoute(
          builder: (context) => DetailPage(selectedCoches),
        ),
      );
    }
  }

  void _showAlertDialog(BuildContext context, String message) {
    showDialog(
      context: context,
      builder: (BuildContext context) {
        return AlertDialog(
          title: Text('Alerta'),
          content: Text(message),
          actions: <Widget>[
            TextButton(
              child: Text('OK'),
              onPressed: () {
                Navigator.of(context).pop();
              },
            ),
          ],
        );
      },
    );
  }

  void _ordenarCochesPorPrecio() {
    _coches.sort((a, b) => int.parse(a.precio).compareTo(int.parse(b.precio)));
    setState(() {});
  }

  void _ordenarCochesPorKm() {
    _coches.sort((a, b) => int.parse(a.km).compareTo(int.parse(b.km)));
    setState(() {});
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Listado de coches'),
        leading: IconButton(
          icon: Icon(Icons.home),
            onPressed: () {
              Navigator.pushReplacement(
                context,
                MaterialPageRoute(builder: (context) => Dashboard()),
              );
            },
        ),
        actions: <Widget>[
          IconButton(
            icon: Text("€"),
            onPressed: _ordenarCochesPorPrecio,
            tooltip: 'Ordenar por Precio',
          ),
          IconButton(
            icon: Text("km"),
            onPressed: _ordenarCochesPorKm,
            tooltip: 'Ordenar por Km',
          ),
        ],
      ),
      body: FutureBuilder<List<Coche>>(
        future: _cochesFuture,
        builder: (BuildContext context, AsyncSnapshot<List<Coche>> snapshot) {
          if (snapshot.connectionState == ConnectionState.waiting) {
            return Center(child: CircularProgressIndicator());
          } else if (snapshot.hasError) {
            return Center(child: Text('Error: ${snapshot.error}'));
          } else if (!snapshot.hasData || snapshot.data!.isEmpty) {
            return Center(child: Text('No hay datos disponibles'));
          } else {
            _coches = snapshot.data!; // Actualizamos la lista de coches
            return ListView.builder(
              itemCount: _coches.length,
              itemBuilder: (BuildContext context, int index) {
                Coche coche = _coches[index];
                return GestureDetector(
                  onTap: () {
                    _toggleCocheSelection(coche);
                  },
                  child: Container(
                    color: coche.isSelected ? Colors.blue : Colors.transparent,
                    child: ListTile(
                      title: Text(
                        '${coche.marca} ${coche.modelo}',
                        style: TextStyle(
                          color: coche.isSelected ? Colors.white : Colors.black,
                          fontWeight: coche.isSelected ? FontWeight.bold : FontWeight.normal,
                        ),
                      ),
                      subtitle: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: <Widget>[
                          Text(
                            '${coche.precio} €',
                            style: TextStyle(
                              color: coche.isSelected ? Colors.white : Colors.black,
                            ),
                          ),
                          Text(
                            '${coche.km} km',
                            style: TextStyle(
                              color: coche.isSelected ? Colors.white : Colors.black,
                            ),
                          ),
                        ],
                      ),
                    ),
                  ),
                );
              },
            );
          }
        },
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: () {
          _compararCoches(context);
        },
        child: Icon(Icons.compare),
      ),
    );
  }
}

class DetailPage extends StatelessWidget {
  final List<Coche> coches;

  DetailPage(this.coches);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Detalles de coches seleccionados'),
      ),
      body: ListView.builder(
        itemCount: coches.length,
        itemBuilder: (context, index) {
          Coche coche = coches[index];
          return Card(
            child: Padding(
              padding: const EdgeInsets.all(16.0),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: <Widget>[
                  Text(
                    'Marca: ${coche.marca}',
                    style: TextStyle(fontWeight: FontWeight.bold),
                  ),
                  Text('Modelo: ${coche.modelo}'),
                  Text('Precio: ${coche.precio} €'),
                  Text('Maletero: ${coche.maletero}'),
                  Text('Km: ${coche.km}'),
                  Text('Potencia: ${coche.potencia}'),
                  Text('Cilindrada: ${coche.cilindrada}'),
                  Text('Consumo urbano: ${coche.consumourbano}'),
                  Text('Consumo extraurbano: ${coche.consumoextraurbano}'),
                  Text('Tracción: ${coche.traccion}'),
                ],
              ),
            ),
          );
        },
      ),
    );
  }
}

class Coche {
  final String marca;
  final String modelo;
  final String precio;
  final String maletero;
  final String km;
  final String potencia;
  final String cilindrada;
  final String consumourbano;
  final String consumoextraurbano;
  final String traccion;
  bool isSelected;

  Coche({
    required this.marca,
    required this.modelo,
    required this.precio,
    required this.maletero,
    required this.km,
    required this.potencia,
    required this.cilindrada,
    required this.consumourbano,
    required this.consumoextraurbano,
    required this.traccion,
    this.isSelected = false,
  });

  factory Coche.fromJson(Map<String, dynamic> json) {
    return Coche(
        marca: json['marca'],
        modelo: json['modelo'],
        precio: json['precio'].toString(),
        maletero: json['maletero'].toString(),
        km: json['km'].toString(),
        potencia: json['potencia'].toString(),
        cilindrada: json['cilindrada'].toString(),
        consumourbano: json['consumourbano'].toString(),
        consumoextraurbano: json['consumoextraurbano'].toString(),
        traccion: json['traccion']);
  }
}
