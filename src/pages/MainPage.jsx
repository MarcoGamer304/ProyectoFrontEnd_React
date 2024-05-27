import CardComponent from '../components/Cards'

const CardGrid = () => {
  return (
    <div className='container'>
      <div className=' header'>
      <h3 className='etiqueta-M'> Modulos </h3>
      </div>
      <div className="containerCards">
      <CardComponent Title='Actividades Academicas' subtitle='Administracion y mantenimiento' textExample='El modulo de administracion y mantenimiento de recetas se encarga de proveer a los usuarios las opciones CRUD de actividades'/>
      <CardComponent Title='Categorias' subtitle='Administracion y mantenimiento' textExample='El modulo de administracion y mantenimiento de recetas se encarga de proveer a los usuarios las opciones CRUD de actividades'/>
      <CardComponent Title='Etiquetas' subtitle='Administracion y mantenimiento' textExample='El modulo de administracion y mantenimiento de recetas se encarga de proveer a los usuarios las opciones CRUD de actividades'/>
      <CardComponent Title='Usuarios' subtitle='Administracion y mantenimiento' textExample='El modulo de administracion y mantenimiento de recetas se encarga de proveer a los usuarios las opciones CRUD de actividades' />
      <CardComponent Title='Estudiantes' subtitle='Administracion y mantenimiento' textExample='El modulo de administracion y mantenimiento de recetas se encarga de proveer a los usuarios las opciones CRUD de actividades'/>
      <CardComponent Title='Docentes' subtitle='Administracion y mantenimiento' textExample='El modulo de administracion y mantenimiento de recetas se encarga de proveer a los usuarios las opciones CRUD de actividades'/>
      <CardComponent Title='Notificaciones y recordatorios' subtitle='Gestion' textExample='El modulo de administracion y mantenimiento de recetas se encarga de proveer a los usuarios las opciones CRUD de actividades'/>
      <CardComponent Title='Cursos' subtitle='Administracion y mantenimiento' textExample='El modulo de administracion y mantenimiento de recetas se encarga de proveer a los usuarios las opciones CRUD de actividades'/>
      <CardComponent Title='Carreras' subtitle='Administracion y mantenimiento' textExample='El modulo de administracion y mantenimiento de recetas se encarga de proveer a los usuarios las opciones CRUD de actividades'/>
      <CardComponent Title='Plan de estudios' subtitle='Administracion y mantenimiento' textExample='El modulo de administracion y mantenimiento de recetas se encarga de proveer a los usuarios las opciones CRUD de actividades'/>
      <CardComponent Title='Estudiantes en grupos/cursos' subtitle='Asignacion de estudiantes' textExample='El modulo de administracion y mantenimiento de recetas se encarga de proveer a los usuarios las opciones CRUD de actividades'/>
      <CardComponent Title='Reportes' subtitle='Reportes Generales' textExample='El modulo de administracion y mantenimiento de recetas se encarga de proveer a los usuarios las opciones CRUD de actividades'/>
      </div>
    </div>

  );
};

export default CardGrid;

