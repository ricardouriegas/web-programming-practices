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

?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?php echo $tituloPagina?></title>
    <!-- include styles -->
    <link rel="stylesheet" href="../practice5/styles.css">
    <style>
        table {
            width: 100%;
            border-collapse: collapse;
        }

        table, th, td {
            border: 1px solid black;
        }

        th, td {
            padding: 10px;
            text-align: left;
        }

        th {
            background-color: #f2f2f2;
        }
    </style>
</head>
<body>
    <canvas id="backgroundCanvas"></canvas>
    <h1><?=$tituloPagina?></h1>
    <div id="controls"class="blur-container">
    
        <p>Ejemplo de contrur una respuesta HTML desdee PHP</p>
        
        <ul>  
            <?php
                for ($i = 0; $i <10 ; $i++) {
                    echo "<li>Hola soy mateo</li>";
                }
            ?>
        </ul>
        
        <h1>Personas</h1>
        
        <table>
            <thead>
                <tr>
                    <th>Nombre</th>
                    <th>Apellidos</th>
                    <th>Deportes Practicados</th>
                </tr>
            </thead>
            <tbody>
                <?php
                    foreach ($personas as $persona) {
                        echo "<tr>";
                        echo "<td>".$persona['nombre']."</td>";
                        echo "<td>".$persona['apellidos']."</td>";
                        echo "<td>";
                        echo "<ul>";
                        foreach ($persona['deportesPracticados'] as $deporte) {
                            echo "<li>".$deporte."</li>";
                        }
                        echo "</ul>";
                        echo "</td>";
                        echo "</tr>";
                    }
                ?>
        </table>
    </div>
    <script src="../practice5/script.js"></script>
</body>
</html>