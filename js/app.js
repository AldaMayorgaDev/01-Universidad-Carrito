/* Variables */

const carrito = document.querySelector('#carrito');
const listaCursos = document.querySelector('#lista-cursos');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');

let articulosCarritos = [];

cargarEventListeners();

function cargarEventListeners() {
    //Cuando se agrega un curso presionando "Agregar al carrito"
    listaCursos.addEventListener('click', agregarCurso);

    // Elimina cursos de carrito
    carrito.addEventListener('click', eliminarCurso);

    //Vaciar el carrito de compras
    vaciarCarritoBtn.addEventListener('click', () => {
        articulosCarritos = []; // Se reseta el arreglo a un arreglo vacio

        limpiarHTML(); // Elimina todo el html

    });
}

/* Funciones */


/* Agregar Curso a Carrito */
function agregarCurso(e) {

    e.preventDefault();

    //Vaidación de que se de clic al botón 'agregar al carrito'
    if (e.target.classList.contains('agregar-carrito')) {
        const cursoSeleccionado = e.target.parentElement.parentElement; /* Se accede a todo el div del contenido del curso  */
        leerDatosCursos(cursoSeleccionado);
    }
}

/* Elimina un curso del carrito */
function eliminarCurso(e) {
    e.preventDefault();

    //Vaidación de que se de clic al botón eliminar del carrito

    if (e.target.classList.contains('borrar-curso')) {
        const cursoId = e.target.getAttribute('data-id');

        //Elimina del arreglo de articulosCarritos por el data-id;
        articulosCarritos = articulosCarritos.filter(curso => curso.id !== cursoId);
        //console.log('articulosCarritos :>> ', articulosCarritos);

        carritoHTML();
    }


}


/* lee el contenido del HTML al que se dio clic y extrar la informacion del curso */
function leerDatosCursos(curso) {
    //console.log(curso);

    /* Crear un objeto con el contenido del curso actual */

    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }
    //console.log('info curso:', infoCurso);


    //Valida si un elemento ya existe en el carrito
    const existe = articulosCarritos.some(curso => curso.id === infoCurso.id);
    if (existe) {
        /* Actualiza la cantidad */
        const cursos = articulosCarritos.map(curso => {
            if (curso.id === infoCurso.id) {
                curso.cantidad++;
                return curso; //retorna el objeto actualizado
            } else {
                return curso; //retorna los objetos que no son los duplicados
            }
        });

        articulosCarritos = [...cursos];
    } else {
        /* Agregar el curso a carrito */

        //Agrega elementos al arreglo de carrito
        articulosCarritos = [...articulosCarritos, infoCurso];

    }



    //console.log('Arreglo carrito', articulosCarritos);

    carritoHTML();
}


/* Muestra el carrito de compras en el html */

function carritoHTML() {

    //limpiar el HTML
    limpiarHTML();

    //Recorre el carrito y genera el html
    articulosCarritos.forEach((curso) => {
        const { imagen, titulo, precio, cantidad, id } = curso;

        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <img src="${imagen}" alt="imagen curso" width= "100">
            </td>
            <td>
                ${titulo}
            </td>
            <td>
                ${precio}
            </td>
            <td>
                ${cantidad}
            </td>
            <td>
                <a href="#" class="borrar-curso" data-id="${id}" > X </a>
            </td>

        `;

        /* Agrega el html del carrito e el tbody */
        contenedorCarrito.appendChild(row);
    })
}


//Elimina los cursos en el tbdoy

function limpiarHTML() {
    /* Forma lenta */
    // contenedorCarrito.innerHTML = '';

    /* Forma con mejor performance */
    while (contenedorCarrito.firstChild) {
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }
}