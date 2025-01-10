import { Home } from "./pages"

function RootLayout() {
  return (
    <div className="bg-gray-50 dark:bg-gray-900 border min-h-screen rounded-md shadow">
      <div className="bg-white border-b-2 px-4 md:px-8 py-6">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight leading-tight text-center mb-4 md:mb-0">
          Listado de Estudiantes
        </h1>
      </div>
      <Home />
    </div>
  )
}

export default RootLayout