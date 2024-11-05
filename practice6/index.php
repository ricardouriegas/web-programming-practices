<?php 
$tituloPagina = "Practice 6: Introduction to server side";


$persona1 = [
    "nombre" => "Persona 1",
    "apellidos" => "Apellido 1",
    "deportesPracticados" => ['Futbol', 'Basquet', 'Tenis']
];

$persona2 = [
    "nombre" => "Persona 2",
    "apellidos" => "Apellido 2",
    "deportesPracticados" => ['2', 'Basquet', 'Tenis']
];

$personas = [$persona1, $persona2];

$deportesPracticados = ['Futbol', 'Basquet', 'Tenis'];

require 'index.view.php'; 