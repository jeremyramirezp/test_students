<?php 

return [ 
    'required' => ':attribute es obligatorio.', 
    'string' => ':attribute debe ser una cadena de texto.', 
    'min' => [ 'string' => ':attribute debe tener al menos :min caracteres.', ], 
    'max' => [ 'string' => ':attribute no debe tener más de :max caracteres.', ], 
    'regex' => 'El formato d:attribute es inválido.', 
    'email' => ':attribute debe ser una dirección de correo válida.', 
    'unique' => ':attribute ya ha sido registrado.', 
    'digits' => ':attribute debe tener :digits dígitos.', 
    'date' => ':attribute debe ser una fecha válida.', 
    'in' => ':attribute debe ser uno de los siguientes valores: :values.', 

    'attributes' => [ 
        'first_name' => 'nombre', 
        'last_name' => 'apellidos', 
        'email' => 'correo electrónico', 
        'phone' => 'teléfono', 
        'birth_date' => 'cumpleaños', 
        'status' => 'estado', 
    ], 
];