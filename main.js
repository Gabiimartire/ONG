const mascotas = [
    { id: 1, nombre: 'Pedrito', especie: 'Perro', descripcion: 'Este adorable cachorro es Pedrito. Es juguetón, cariñoso y está ansioso por encontrar un hogar que lo llene de mimos.', imagen: './img/perro1.jpeg' },
    { id: 2, nombre: 'Pancho', especie: 'Perro', descripcion: 'Pancho es un perro adulto con una mirada llena de nobleza. Es tranquilo, leal y el compañero ideal para quien busque un amigo fiel.', imagen: './img/perro2.jpeg' },
    { id: 3, nombre: 'Josefina', especie: 'Gato', descripcion: 'Josefina es una gata tricolor increíblemente dulce. Es tranquila, cariñosa y le encanta acurrucarse.', imagen: './img/gato1.jpeg' },
    { id: 4, nombre: 'Simba', especie: 'Gato', descripcion: 'Este pequeño explorador es Simba. Es un gatito lleno de curiosidad y travesuras. Busca una familia paciente.', imagen: './img/gato2.jpeg' },
];

function crearTarjetaMascota(mascota) {
    return `
        <div class="col-lg-3 col-md-6" data-aos="fade-up">
            <div class="card h-100 shadow-sm">
                <img class="card-img-top" src="${mascota.imagen}" alt="Imagen de ${mascota.nombre}">
                <div class="card-body d-flex flex-column">
                    <h5 class="card-title">${mascota.nombre}</h5> 
                    <p class="card-text">${mascota.descripcion}</p>
                    <a href="#" class="btn btn-outline-info mt-auto">Adoptar</a>
                </div>
            </div>
        </div>
    `;
}
function mostrarMascotas(filtroEspecie = 'Todos') {
    const contenedor = document.getElementById('galeria-mascotas');
    if (!contenedor) return; 

    contenedor.innerHTML = '';

    const mascotasFiltradas = mascotas.filter(mascota => {
        return filtroEspecie === 'Todos' || mascota.especie === filtroEspecie;
    });

    mascotasFiltradas.forEach(mascota => {
        contenedor.innerHTML += crearTarjetaMascota(mascota);
    });
}

document.addEventListener("DOMContentLoaded", () => { 

    mostrarMascotas('Todos');

    const btnTodos = document.getElementById('filtro-todos');
    const btnPerros = document.getElementById('filtro-perros');
    const btnGatos = document.getElementById('filtro-gatos');

    if (btnTodos) {
        btnTodos.addEventListener('click', () => mostrarMascotas('Todos'));
    }
    if (btnPerros) {
        btnPerros.addEventListener('click', () => mostrarMascotas('Perro'));
    }
    if (btnGatos) {
        btnGatos.addEventListener('click', () => mostrarMascotas('Gato'));
    }


    const options = {
        threshold: 0.5 
    }
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target
                const targetVal = el.getAttribute('data-target');
                const countUpOptions = {
                    startVal: 0,
                    duration: 2.5,
                    useEasing: true,
                    useGrouping: false, 
                }
                const anim = new countUp.CountUp(el, targetVal, countUpOptions)
                if (!anim.error) {
                    anim.start()
                } else {
                    console.error(anim.error)
                    el.innerText = targetVal 
                } 
                observer.unobserve(el)
            }
        })
    }, options)

    const counters = document.querySelectorAll('.counter')
    counters.forEach(counter => {
        observer.observe(counter)
    })

})