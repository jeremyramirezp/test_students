<?php

namespace App\Http\Controllers;

use App\Http\Resources\StudentResource;
use App\Models\Student;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class StudentController extends Controller
{

    private function validateStudent (Request $request, $id = null) {
        return Validator::make($request->all(), [
            'first_name' => 'required|string|min:1|max:50|regex:/^[a-zA-Z\s]+$/',
            'last_name' => 'required|string|min:1|max:50|regex:/^[a-zA-Z\s]+$/',
            'email' => 'required|email|unique:student,email' . ($id ? ",$id" : ''), 
            'phone' => 'required|digits:9', 
            'birth_date' => 'required|date',
            'status' => 'nullable|in:Activo,Inactivo',
        ], [ // Separar en resources/lang para el idioma
            'first_name.required' => 'El nombre es obligatorio.',
            'first_name.string' => 'El nombre debe ser una cadena de texto.',
            'first_name.min' => 'El nombre debe tener al menos 1 carácter.',
            'first_name.max' => 'El nombre no puede tener más de 50 caracteres.',
            'first_name.regex' => 'El nombre solo puede contener letras y espacios.',
            'last_name.required' => 'El apellido es obligatorio.',
            'last_name.string' => 'El apellido debe ser una cadena de texto.',
            'last_name.min' => 'El apellido debe tener al menos 1 carácter.',
            'last_name.max' => 'El apellido no puede tener más de 50 caracteres.',
            'last_name.regex' => 'El apellido solo puede contener letras y espacios.',
            'email.required' => 'El correo electrónico es obligatorio.',
            'email.email' => 'El correo electrónico debe ser una dirección válida.',
            'email.unique' => 'El correo electrónico ya está registrado.',
            'phone.required' => 'El teléfono es obligatorio.',
            'phone.digits' => 'El teléfono debe tener 9 dígitos.',
            'birth_date.required' => 'El cumpleaños es obligatorio.',
            'birth_date.date' => 'El cumpleaños no es válido.',
            'status.in' => 'El estado debe ser Activo o Inactivo.',
        ])->after(function ($validator) use ($request) { 
            $birthDate = strtotime($request->input('birth_date'));
            $currentDate = time();
            $age = (int)date('Y', $currentDate) - (int)date('Y', $birthDate);
            if (date('md', $birthDate) > date('md', $currentDate)) {
                $age--;
            }
            if ($age <= 16 || $age >= 60) {
                $validator->errors()->add('birth_date', 'La edad debe estar entre 16 y 60 años.');
            }
        });
    }

    private function responseJson ($data, $message = '', $status = 200) {
        return response()->json([ 
            'message' => $message, 
            'data' => $data 
        ], $status);
    }

    public function addStudent(Request $request) {
        $validator = $this->validateStudent($request);

        if ($validator->fails()) return $this->responseJson($validator->errors(), 'Validación fallida', 422);

        $data = $request->all();
        $data['enrollment_date'] = now();
        $student = Student::create($data);

        return $this->responseJson(
            new StudentResource($student), 
            'Estudiante agregado correctamente', 
            201
        );
    }

    public function getStudents (Request $request) {
        $itemsPerPage = $request->input('perPage', 10);
        $searchTerm = $request->input('search', '');
        $statusFilter = $request->input('status', '');

        $studentsQuery = Student::query();
        if (! empty($searchTerm)) {
            $studentsQuery->where(function($query) use ($searchTerm) {
                $query->where(DB::raw("CONCAT(first_name, ' ', last_name)"), 'LIKE', "%{$searchTerm}%") 
                    ->orWhere('email', 'LIKE', "%{$searchTerm}%"); 
            });
        }

        if (!empty($statusFilter)) {
            $studentsQuery->where('status', $statusFilter);
        }

        $students = $studentsQuery->orderBy('created_at', 'desc')->paginate((int)$itemsPerPage);

        if ($students->isEmpty()) {
            return $this->responseJson([], 'No se encontraron estudiantes', 404);
        }

        return response()->json([ 
            'totalItems' => $students->total(), 
            'itemsPerPage' => $students->perPage(), 
            'totalPages' => $students->lastPage(), 
            'currentPage' => $students->currentPage(),
            'data' => StudentResource::collection($students),
        ], 200);
    }

    public function getStudentById ($id) {
        $student = Student::find($id);

        if (! $student) return $this->responseJson([], 'No se encontro al estudiante', 404);

        return $this->responseJson(new StudentResource($student));
    }

    public function updateStudentById (Request $request, $id) {
        $student = Student::find($id);

        if (! $student) return $this->responseJson([], 'No se encontró al estudiante', 404);

        $validator = $this->validateStudent($request, $id);

        if ($validator->fails()) return $this->responseJson($validator->errors(), 'Validación fallida', 422);

        $student->update($request->all());

        return $this->responseJson(new StudentResource($student), 'Estudiante actualizado correctamente');
    }

    public function deleteStudentById ($id) {
        $student = Student::find($id);

        if (! $student) return $this->responseJson([], 'No se encontró al estudiante', 404);

        $student->delete();

        return $this->responseJson([], 'Estudiante eliminado correctamente');
    }

}
