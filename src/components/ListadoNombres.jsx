import React, { useState } from 'react';
import uniqid from 'uniqid';    

const ListadoNombres = () => {

    const [nombre, setNombre] = useState('')                // Estado del nombre
    const [lista, setLista] = useState([])                  // Estado de la lista de nombres
    const [edicion, setEdicion] = useState(false)           // Estado para editar los nombres
    const [id, setId] = useState('')                        // Estado para definir id y poder editar el nombre de la lista en concreto
    const [error, setError] = useState(null)                // Estado para comprobar si se está ingresando un campo vacío o no

    

    const agregarNombre = e => {
        /*
        Función:
            - Añade los nombres que pongamos en el campo del formulario al estado lista, pasandolo del estado nombre
            - Comprueba si estamos enviando un String vacío al estado de nombre y envía un mensaje de error
        */
        e.preventDefault()                          // Evita que se recargue la página 
        if(!nombre.trim()){                         // (trim() evalua si el campo tiene contenido) Sí nombre no tiene contenido, la constante error pasa de null al mensaje
            setError('El campo nombre está vacío')  
            return;
        }
        const nuevoNombre = {                       // Nuevo array con el cual reescribo los valores del estado lista
            id: uniqid(),                           // asigno la libreria uniqid al valor id para generar un id aleatorio
            tituloNombre: nombre                    
        }
        setLista([...lista, nuevoNombre])           // Al no añadirse los nombres uno detrás del otro, se itera el estado lista agregandole como segundo valor el arreglo nuevoNombre
        setNombre('')                               // Al cumplirse ya todo lo anterior, volvemos a poner el campo de nombre en un String vacío
        setError(null)                              // Si ya comprobó en el if que nombre si tiene contenido, entonces setea el error en nulo para no mostrar el mensaje
    }

    const eliminarNombre = id => {
        /*
        Función:
            - Elimina un nombre de la lista através del botón ELIMINAR
        */
        const nuevoArray = lista.filter( item => item.id !== id)    // Filtro el array de lista, si el item.id es diferente al id que recibimos por parámetro en la función, borra el array actual del objeto de la lista
        setLista(nuevoArray)                                        // Seteo el array en la lista al dar click en botón
    }

    const editar = item => {
        /*
        Función
            - Habilita el modo edición si se da click
        */
        setEdicion(true)                         // Pone el evento que está disponible para Modo Edición
        setNombre(item.tituloNombre)             // En el placeholder, pone el nombre del item actual que se está modificando
        setId(item.id)                                              
    }

    const editarNombre = (e) => {
        /*
        Función:
            - Esta es la función que se va a lanzar
        */
        e.preventDefault()
        const NuevoArray = lista.map( item => item.id === id ? {id: id, tituloNombre: nombre}: item)    // Si item.id es igual al id, insertamos un nuevo objeto con id y tituloNombre, que será el nuevo nombre que introducimos
        setLista(NuevoArray)                                                                            // Asignamos el nuevo array
        setEdicion(false)                                                                               // Al ya realizar los cambios, deshabilita el modo edición
        setNombre('')                                                                                   // Cambia el estado del nombre (placeholder) y lo deja en String vacío
    }

    return ( 
        <div className="container">
            <h1 className="text-center mt-4">Aplicación de CRUD básica</h1>
            <h2 className="text-center mb-5 ">Por Brandon Andrés Vargas Piñeros</h2>
            <div className="row">
                <div className="col">
                    <h2>Listado de nombres</h2>
                    <ul className="list-group">
                        {
                            lista.map( item =>                                
                                <li key={item.id} className="list-group-item">
                                    {item.tituloNombre}
                                    <button 
                                    className="btn btn-danger float-right"
                                    onClick={ () => {eliminarNombre(item.id)}}
                                    >ELIMINAR &times;</button>
                                    <button 
                                    className="btn btn-info float-right"
                                    onClick={ () => {editar(item)}}
                                    >EDITAR &crarr;</button>                                  
                                    </li>
                                )
                        }
                    </ul>
                </div>
                <div className="col">
                    <h2>Formulario para añadir nombres</h2>
                    <form onSubmit={ edicion ? editarNombre : agregarNombre } className="form-group">
                        <input
                            className="form-control mb-3"
                            onChange={(e) => {setNombre(e.target.value)}}
                            type="text"
                            placeholder="Introduce el nombre"
                            value={nombre}
                        ></input>
                        <input
                            className="btn-info btn-block"
                            type="submit"
                            value={edicion ? 'EDITAR NOMBRE' : 'REGISTRAR NOMBRE'}
                        ></input>
                    </form>
                    {
                        error !== null ?  (
                            <div className="alert alert-danger">
                                {error}
                            </div>
                        ):
                        (
                            <></>
                        )
                    }
                </div>

            </div>
        </div>
     );
}
 
export default ListadoNombres;  
