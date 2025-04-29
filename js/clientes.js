document.addEventListener('DOMContentLoaded', async () => {
    const tbody = document.getElementById('clientes-collection');

    try {
        const response = await fetch('http://localhost:3000/clientes');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const clientes = await response.json();

        clientes.forEach(cliente => {
            const row = document.createElement('tr');
            row.innerHTML = `
                    <td>${cliente.nombre || 'n/a'}</td>
                    <td>${cliente.apellido || 'n/a'}</td>
                    <td>${cliente.contacto || 'n/a'}</td>
                    <td>${cliente.direccion || 'n/a'}</td>
                    <td>
                    <button>Modificar</button>
                    <button>Eliminar</button>
                    </td>
            `;
            tbody.appendChild(row);
        });
    } catch (error) {
        console.error('Error al cargar los clientes:', error);
    }
});