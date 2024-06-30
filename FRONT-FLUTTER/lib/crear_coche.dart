import 'package:flutter/material.dart';
import 'package:image_picker/image_picker.dart';
import 'package:http/http.dart' as http;
import 'dart:io';
import 'dart:convert';

import 'dashboard.dart';

class NuevoCoche extends StatefulWidget {
  @override
  _NuevoCocheState createState() => _NuevoCocheState();
}

class _NuevoCocheState extends State<NuevoCoche> {
  File? _image;
  final picker = ImagePicker();
  final TextEditingController _marcaController = TextEditingController();
  final TextEditingController _modeloController = TextEditingController();
  final TextEditingController _precioController = TextEditingController();
  final TextEditingController _maleteroController = TextEditingController();
  final TextEditingController _kmController = TextEditingController();
  final TextEditingController _potenciaController = TextEditingController();
  final TextEditingController _cilindradaController = TextEditingController();
  final TextEditingController _consumourbanoController = TextEditingController();
  final TextEditingController _consumoextraurbanoController = TextEditingController();
  final TextEditingController _traccionController = TextEditingController();

  Future<void> _pickImage() async {
    final pickedFile = await picker.getImage(source: ImageSource.gallery);

    setState(() {
      if (pickedFile != null) {
        _image = File(pickedFile.path);
      } else {
        print('No image selected.');
      }
    });
  }

  Future<void> _uploadData() async {
    if (_image == null) {
      print('No image selected.');
      return;
    }

    try {
      final request = http.MultipartRequest(
        'POST',
        Uri.parse('http://10.0.2.2:4001/api/newcar'), // Use 10.0.2.2 for Android emulator
      );

      request.fields['marca'] = _marcaController.text;
      request.fields['modelo'] = _modeloController.text;
      request.fields['precio'] = _precioController.text;
      request.fields['maletero'] = _maleteroController.text;
      request.fields['km'] = _kmController.text;
      request.fields['potencia'] = _potenciaController.text;
      request.fields['cilindrada'] = _potenciaController.text;
      request.fields['consumourbano'] = _consumourbanoController.text;
      request.fields['consumoextraurbano'] = _consumoextraurbanoController.text;
      request.fields['traccion'] = _traccionController.text;
      request.files.add(await http.MultipartFile.fromPath('imagen', _image!.path));

      print('Request: $request');
      final response = await request.send();

      if (response.statusCode == 200) {
        print('Uploaded successfully');
        Navigator.pushReplacement(
          context,
          MaterialPageRoute(builder: (context) => Dashboard()),
        );

      } else {
        print('Failed to upload. Status code: ${response.statusCode}');
        final responseBody = await response.stream.bytesToString();
        print('Response body: $responseBody');
      }
    } catch (e) {
      print('Error: $e');
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Nuevo Coche'),
      ),
      body: Center(
        child: SingleChildScrollView(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: <Widget>[
              _image == null
                  ? Text('No image selected.')
                  : Image.file(_image!),
              TextField(
                controller: _marcaController,
                decoration: InputDecoration(labelText: 'Marca'),
              ),
              TextField(
                controller: _modeloController,
                decoration: InputDecoration(labelText: 'Modelo'),
              ),
              TextField(
                controller: _precioController,
                decoration: InputDecoration(labelText: 'Precio'),
              ),
              TextField(
                controller: _maleteroController,
                decoration: InputDecoration(labelText: 'Maletero'),
              ),
              TextField(
                controller: _kmController,
                decoration: InputDecoration(labelText: 'Km'),
              ),
              TextField(
                controller: _potenciaController,
                decoration: InputDecoration(labelText: 'Potencia'),
              ),
              TextField(
                controller: _cilindradaController,
                decoration: InputDecoration(labelText: 'Cilindrada'),
              ),
              TextField(
                controller: _consumourbanoController,
                decoration: InputDecoration(labelText: 'Consumo urbano'),
              ),
              TextField(
                controller: _consumoextraurbanoController,
                decoration: InputDecoration(labelText: 'Consumo extraurbano'),
              ),
              TextField(
                controller: _traccionController,
                decoration: InputDecoration(labelText: 'Tracción'),
              ),
              ElevatedButton(
                onPressed: _pickImage,
                child: Text('Seleccionar Imagen'),
              ),
              ElevatedButton(
                onPressed: _uploadData,
                child: Text('Crear Coche'),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
