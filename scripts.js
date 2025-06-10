
const supabaseURL = 'https://gnpjknkthwyxjtexrvbo.supabase.co'
const supabaseKEY =  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImducGprbmt0aHd5eGp0ZXhydmJvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk1MjkxMDgsImV4cCI6MjA2NTEwNTEwOH0.8pBcROXbQJjhM9gFNyNHfTjbHmPCE6RexlkqX4qtU3U'
const supabase = window.supabase.createClient(supabaseURL, supabaseKEY);

let personas = [];
let editando = null;
let tablaBody = document.querySelector("table tbody");
const formulario = document.getElementById("formulario");

// Agregar A supabase
async function cargarPersona() {
        const { data, error } = await supabase
        .from('Personas')
        .select("*")

        if(error){
            console.error('Error al cargar persona, ', error)
        } else {
            personas = data.map(persona =>({
                id: persona.id,
                tipoDocumento: persona.tipo_documento,
                numDocumento: persona.numero_documento,
                nombres: persona.nombre,
                apellidos: persona.apellido,
                telefonoNum: persona.telefono,
                correo: persona.correo
            }));
            mostrarPersonas()
        }
}

// Funcion para agregar a la persona a la tabla
async function guardarPersonaSP(dato) {
    const {error} = await supabase
    .from ('Personas')
    .insert([{
        tipo_documento: dato.tipoDocumento,
        numero_documento: dato.numDocumento,
        nombre: dato.nombres,
        apellido: dato.apellidos,
        telefono: dato.telefonoNum,
        correo: dato.correo
    }]);

    if(error){
        console.error("Error al agregar a la persona, ", error);
    } else{
        cargarPersona();
    }
}


formulario.addEventListener("submit", function(e){
    e.preventDefault()
    const tipoDocumento = document.getElementById("documentoTipo").value;
    const numDocumento = document.getElementById("numDocumento").value;
    const nombres = document.getElementById("nombre").value;
    const apellidos = document.getElementById("apellido").value;
    const telefonoNum = document.getElementById("numTelefono").value;
    const correo = document.getElementById("correoElectronico").value;

    const personaNueva = {
        tipoDocumento,
        numDocumento,
        nombres,
        apellidos,
        telefonoNum,
        correo
    }

    if(editando != null){
        const idEditar = personas[editando].id;
        actualizarPersonasSP(idEditar, personaNueva);
        editando = null
    } else {
        guardarPersonaSP(personaNueva)
    }

    formulario.reset();

})

// Mostrar Personas

function mostrarPersonas(){
    tablaBody.innerHTML  = "";

    personas.forEach((persona, index)=>{
        
        const fila = document.createElement("tr");

        fila.innerHTML = ``

        fila.innerHTML = `
            <td class="py-4 px-4 border">${persona.id.toString().padStart(2, "0")}</td>
            <td class="py-4 px-4 border">${persona.tipoDocumento}</td>
            <td class="py-4 px-4 border">${persona.numDocumento}</td>
            <td class="py-4 px-4 border">${persona.nombres}</td>
            <td class="py-4 px-4 border">${persona.apellidos}</td>
            <td class="py-4 px-4 border">${persona.telefonoNum}</td>
            <td class="py-4 px-4 border">${persona.correo}</td>
            <td class="py-4 px-4 border">
                <button class="bg-yellow-400 hover:bg-yellow-500 rounded-md text-black py-1 px-2 border">Editar</button>
                <button class="bg-red-500 hover:bg-red-600 rounded-md text-white py-1 px-2 ml-2 border">Eliminar</button>
            </td>
        `
        tablaBody.appendChild(fila);

    });
}






cargarPersona()
