// Arreglo global de objetos para almacenar las Hojas de Vida
let hojasDeVida = [
    { 
        nombres: "Ikaros",
        apellidos: "Software",
        documento: "1090123",
        nivel: "Universitario",
        institucion: "U. del Quindío",
        ultimaEmpresa: "Tech Dev",
        ultimoCargo: "Desarrollador Junior",
        estado: "Diligenciada"
    },
    {
        nombres: "Wendy",
        apellidos: "Admin",
        documento: "1090456",
        nivel: "Secundaria",
        institucion: "Colegio Nacional",
        ultimaEmpresa: "Logística S.A.",
        ultimoCargo: "Asistente",
        estado: "Aceptada"
    }
];

// Configuraciones iniciales
const ESTADOS_HV = ["Diligenciada", "Aceptada", "Rechazada"];

function validarCampoVacio (valor){
    //se encarga de eliminar los espacios en blanco tanto al inicio como al final de una cadena de texto
    return valor.trim() === "";
}

function validarFormularioDatosPersonales() {
    const nombres = document.getElementById('nombres').value;
    const apellidos = document.getElementById('apellidos').value;
    const documento = document.getElementById('documento').value;

    if (validarCampoVacio(nombres) || validarCampoVacio(apellidos) || validarCampoVacio(documento)) {
        alert("Error: Todos los campos obligatorios deben estar llenos.");
        return false;
    }
    return true;
}
function filtrarHojasDeVida() {
    const filtro = document.getElementById('filtro-estado').value;
    const listaContenedor = document.querySelector('.lista');
    
    // Limpiamos la lista actual
    listaContenedor.innerHTML = "";

    // Filtramos el arreglo
    const resultados = hojasDeVida.filter(hv => {
        if (filtro === "todos") return true;
        return hv.estado === filtro;
    });

    // Pintamos los resultados
    if (resultados.length === 0) {
        listaContenedor.innerHTML = "<p>No hay registros con este estado.</p>";
    } else {
        resultados.forEach(hv => {
            const p = document.createElement('p');
            p.textContent = `${hv.nombres} ${hv.apellidos} - ${hv.estado}`;
            listaContenedor.appendChild(p);
        });
    }
}

function cambiarEstadoManual() {
    const index = document.getElementById('seleccionar-usuario').value;
    const nuevoEstado = document.getElementById('nuevo-estado').value;

    // Modificamos el arreglo global de prueba
    hojasDeVida[index].estado = nuevoEstado;

    alert(`Estado de ${hojasDeVida[index].nombres} actualizado a ${nuevoEstado}`);

    // Refrescamos la lista para que se vea el cambio
    renderizarAdmin();
}

function agregarExperiencia() {
    const contenedor = document.getElementById('contenedor-experiencia');
    const nuevoBloque = document.createElement('div');
    nuevoBloque.className = 'bloque';
    nuevoBloque.innerHTML = `
        <div class="grupo">
            <label>Empresa</label>
            <input type="text">
        </div>
        <div class="grupo">
            <label>Fecha Inicio</label>
            <input type="date">
        </div>
        <div class="grupo">
            <label>Fecha Fin</label>
            <input type="date">
        </div>
    `;
    contenedor.appendChild(nuevoBloque);
}

function agregarEducacionSuperior() {
    const contenedor = document.getElementById('contenedor-superior');
    const nuevoBloque = document.createElement('div');
    nuevoBloque.className = 'bloque';
    nuevoBloque.innerHTML = `
        <div class="grupo">
            <label>Título Obtenido</label>
            <input type="text">
        </div>
        <div class="grupo">
            <label>Institución</label>
            <input type="text">
        </div>
    `;
    contenedor.appendChild(nuevoBloque);
}

// Función para cambiar el estado de una HV específica
function actualizarEstado(id, nuevoEstado) {
    if (hojasDeVida[id]) {
        hojasDeVida[id].estado = nuevoEstado;
        alert(`Estado actualizado a: ${nuevoEstado}`);
    }
}

// Cálculo de tiempo total de experiencia
function calcularTotalExperiencia(listaExperiencias) {
    // Lógica para sumar meses/años de cada registro
    return listaExperiencias.reduce((total, exp) => total + exp.duracionMeses, 0);
}

// Función para capturar los datos y guardarlos en el arreglo
function guardarHojaDeVida() {
    if (validarFormularioDatosPersonales()) {
        const nuevaHV = {
            id: hojasDeVida.length,
            nombres: document.getElementById('nombres').value,
            apellidos: document.getElementById('apellidos').value,
            documento: document.getElementById('documento').value,
            estado: "Diligenciada",
            experiencia: []
        };
        
        hojasDeVida.push(nuevaHV);
        alert("¡Hoja de Vida guardada con éxito!");
        console.log(hojasDeVida);
    }
}

function calcularExperienciaTotal() {
    // Obtenemos todos los bloques de experiencia creados dinámicamente
    const bloques = document.querySelectorAll('#contenedor-experiencia .bloque');
    let totalMeses = 0;

    bloques.forEach(bloque => {
        const fechaInicio = new Date(bloque.querySelector('input[type="date"]:first-of-type').value);
        const fechaFin = new Date(bloque.querySelector('input[type="date"]:last-of-type').value);

        if (!isNaN(fechaInicio) && !isNaN(fechaFin)) {
            // Calculamos la diferencia en meses
            const meses = (fechaFin.getFullYear() - fechaInicio.getFullYear()) * 12 + (fechaFin.getMonth() - fechaInicio.getMonth());
            totalMeses += meses;
        }
    });

    const anios = Math.floor(totalMeses / 12);
    const mesesRestantes = totalMeses % 12;

    alert(`Experiencia Total: ${anios} años y ${mesesRestantes} meses.`);
    return totalMeses;
}

function renderizarAdmin() {
    const listaDiv = document.querySelector('.lista');
    listaDiv.innerHTML = ''; // Limpiamos la lista actual

    hojasDeVida.forEach((hv, index) => {
        const p = document.createElement('p');
        p.textContent = `${hv.nombres} ${hv.apellidos} - Estado: ${hv.estado}`;
        listaDiv.appendChild(p);
    });
}

function agregarIdioma() {
    const contenedor = document.getElementById('contenedor-idiomas');
    const nuevoBloque = document.createElement('div');
    nuevoBloque.className = 'bloque';
    nuevoBloque.innerHTML = `
        <div class="grupo">
            <label>Idioma</label>
            <input type="text">
        </div>
        <div class="grupo">
            <label>Cargo</label>
            <input type="text" placeholder="Cargo desempeñado">
        </div>
        <div class="grupo">
            <label>Nivel</label>
            <select>
                <option value="">Seleccione</option>
                <option>Básico</option>
                <option>Intermedio</option>
                <option>Avanzado</option>
            </select>
        </div>
    `;
    contenedor.appendChild(nuevoBloque);
}

function visualizarDatos() {
    // Intentamos obtener los datos personales
    const nombres = document.getElementById('nombres')?.value;
    const apellidos = document.getElementById('apellidos')?.value;

    // Datos Personales
    if (nombres !== undefined) {
        if (validarCampoVacio(nombres) || validarCampoVacio(apellidos)) {
            alert("Primero debes llenar los nombres y apellidos.");
        } else {
            alert(`--- Previsualización de Datos Personales ---\nNombre: ${nombres} ${apellidos}\nEstado: Pendiente.`);
        }
        return;
    }

    // 2. Formación Académica
    const nivelBasico = document.getElementById('nivel-basico')?.value;
    const institucionBasica = document.getElementById('institucion-basica')?.value;

    if (nivelBasico !== undefined) {
        if (validarCampoVacio(nivelBasico) || validarCampoVacio(institucionBasica)) {
            alert("⚠️ Por favor selecciona el nivel y escribe la institución.");
        } else {
            alert(`--- Previsualización Académica ---\nNivel: ${nivelBasico}\nInstitución: ${institucionBasica}`);
        }
        return;
    }

    // Experiencia Laboral
    const contenedorExp = document.getElementById('contenedor-experiencia');
    if (contenedorExp) {
        const primeraEmpresa = contenedorExp.querySelector('input[placeholder="Nombre de la empresa"]')?.value || "";
        const primerCargo = contenedorExp.querySelector('input[placeholder="Cargo desempeñado"]')?.value || "";

        if (validarCampoVacio(primeraEmpresa)) {
            alert("Al menos debes llenar la primera empresa para previsualizar.");
        } else {
            alert(`--- Previsualización de Experiencia ---\nÚltima Empresa: ${primeraEmpresa}\nCargo: ${primerCargo}`);
        }
        return;
    }


    
    // Si no es ninguna de las anteriores
    alert("Previsualización no disponible para esta sección.");
}

function validarYContinuar() {
    if (validarFormularioDatosPersonales()) {
        // Si es válido, guardamos en LocalStorage y saltamos
        localStorage.setItem('temp_nombres', document.getElementById('nombres').value);
        localStorage.setItem('temp_apellidos', document.getElementById('apellidos').value);
        localStorage.setItem('temp_documento', document.getElementById('documento').value);
        window.location.href = "educacionBasica.html";
    }
}

// Para que cargue la lista si estamos en la página de admin
if (document.querySelector('.lista')) {
    renderizarAdmin();
}
