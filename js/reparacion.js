document.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById('open_selector');
    const selector = document.getElementById('clientSelector');
    const buscador = document.getElementById('buscadorCliente');
    const campos = ['nombre', 'apellido', 'direccion', 'telefono'];
    
    // Cargar clientes desde el backend
    async function cargarClientes() {
        try {
            const response = await fetch('http://localhost:3000/clientes');
            if (!response.ok) throw new Error('Error al cargar clientes');
            const clientes = await response.json();
            clientes.forEach(cliente => {
                const option = document.createElement('option');
                option.value = cliente._id || cliente.contacto || cliente.nombre;
                option.textContent = `${cliente.nombre} ${cliente.apellido}`;
                option.dataset.nombre = cliente.nombre || '';
                option.dataset.apellido = cliente.apellido || '';
                option.dataset.direccion = cliente.direccion || '';
                option.dataset.telefono = cliente.contacto || '';
                option.style.color = 'white';
                selector.appendChild(option);
            });
            selector.style.color = '#09f';
        } catch (error) {
            console.error(error);
        }
    }
    
    cargarClientes();

    
    // Mostrar/ocultar el selector y buscador
    btn.addEventListener('click', function () {
        const visible = selector.style.display === 'block';
        selector.style.display = visible ? 'none' : 'block';
        buscador.style.display = visible ? 'none' : 'inline-block';

        // Cambia el color del botón al presionar
        if (visible) {
            this.style.backgroundColor = '';
            this.style.color = '';
        } else {
            this.style.backgroundColor = '#09f';
            this.style.color = 'white';
        }
        this.style.transition = 'background-color 0.3s ease-in-out, color 0.3s ease-in-out';

        if (!visible) {
            buscador.focus();
            selector.focus();
        }
    });


    // Cambiar datos del formulario según selección
    selector.addEventListener('change', function () {
        if (this.value === 'nuevoCliente') {
            campos.forEach(id => {
                document.getElementById(id).value = '';
                document.getElementById(id).disabled = false;
                document.getElementById(id).style.color = 'white';
                document.getElementById(id).style.transition = 'color 1s ease-in-out';
            });
        } else {
            const selected = this.options[this.selectedIndex];
            campos.forEach(id => {
                document.getElementById(id).value = selected.dataset[id] || '';
                document.getElementById(id).disabled = true;
                document.getElementById(id).style.color = '#09f';
                document.getElementById(id).style.transition = 'color 1s ease-in-out';
            });
        }
        document.getElementById('descripcion').disabled = false;
    });

    // Filtrar clientes por nombre
    buscador.addEventListener('input', function () {
        const filtro = this.value.toLowerCase();
        Array.from(selector.options).forEach(option => {
            const nombreCompleto = option.textContent.toLowerCase();
            option.style.display = nombreCompleto.includes(filtro) ? 'block' : 'none';
        });
    });
});
