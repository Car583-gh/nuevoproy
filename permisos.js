// Obtener permisos de un rol seleccionado
async function obtenerPermisos(){
    const selectElement = document.getElementById('selectRol');
    const selectValue = selectElement ? selectElement.value : null;
}

try {
    const response = await fetch (`${apiUrl}/roles/${selectValue}/permisos`);
    if (!response.ok) {
        throw new Error("Error en la respuesta de la API");
    }
    const permisos = await response.json();
    console.log("Permisos recibidos:", permisos);

    const listaPermisos = document.getElementById("listaPermisos");
    if (!listaPermisos){
        console.error("Elemento 'listaPermisos' no encontrado en el DOM.");
        return;
    }
    
    listaPermisos.innerHTML = "", // Limpiar la lista

    permisos.forEach((permiso, index) => {
        console.log(`Permiso[${index}]:`, permiso);
        const listItem = document.createElement("li");
        listItem.className = "list-group-item d-flex justify-content-between align-items-center";
        listItem.innerHTML = `
         ${permiso.nombre_permiso} 
             <div>
            <button class="btn btn-sm btn-warning" onclick="editarPermiso(${permiso.id_permiso}, '${permiso.nombre_permiso}')">Editar</button> 
            <button class="btn btn-sm btn-danger" onclick="eliminarPermiso(${permiso.id_permiso})">Eliminar</button> </div> `;
            listaPermisos.appendChild(listItem);
        });
    } catch (error) {
        console.error("Error al obtener permisos:", error);
    }

// Función para editar un permiso 
function editarPermiso(id, nombre) { 
    const nuevoNombre = prompt("Edita el nombre del permiso:", nombre); 
    if (nuevoNombre) { 
        actualizarPermiso(id, nuevoNombre); 
    }
 }
 // Función para actualizar un permiso en la base de datos 
 async function actualizarPermiso(id, nombre) { 
    try { 
        const response = await fetch(`${apiUrl}/permisos/${id}`, { 
            method: 'PUT', 
            headers: { 'Content-Type': 'application/json' }, 
            body: JSON.stringify({ nombre_permiso: nombre }) 
        }); 
        if (response.ok) { 
            obtenerPermisos(); 
            mostrarMensajeExito(); 
        } else { 
            mostrarMensajeError('Error al actualizar el permiso.'); 
        } 
    } catch (error) { 
        console.error("Error al actualizar el permiso:", error); 
        mostrarMensajeError('Error al actualizar el permiso.'); 
    } 
}

// Función para eliminar un permiso de la base de datos 
async function eliminarPermiso(id) { 
    if (confirm("¿Estás seguro de que quieres eliminar este permiso?")) { 
        try { const response = await fetch(`${apiUrl}/permisos/${id}`, { 
            method: 'DELETE' 
    }); 
        if (response.ok) { 
            obtenerPermisos(); 
            mostrarMensajeExito(); 
        } else { 
            mostrarMensajeError('Error al eliminar el permiso.'); 
    } 
} catch (error) { 
    console.error("Error al eliminar el permiso:", error); 
    mostrarMensajeError('Error al eliminar el permiso.'); 
}
 }
  }