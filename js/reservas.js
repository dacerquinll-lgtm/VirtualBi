document.addEventListener('DOMContentLoaded', function() {
    const tablaBody = document.querySelector('#tablaReservas tbody');
    const buscadorInput = document.getElementById('buscador');
    const contadorVigentes = document.getElementById('contadorVigentes');

    function cargarReservas(filtro = '') {
        const reservas = JSON.parse(localStorage.getItem('reservasBiblioteca')) || [];
        tablaBody.innerHTML = '';
        let vigentes = 0;

        const filtroLowerCase = filtro.toLowerCase();

        const reservasFiltradas = reservas.filter(reserva =>
            reserva.nombre.toLowerCase().includes(filtroLowerCase) ||
            reserva.titulo.toLowerCase().includes(filtroLowerCase)
        );

        reservasFiltradas.forEach(reserva => {
            const fila = document.createElement('tr');
            fila.innerHTML = `
                <td>${reserva.nombre}</td>
                <td>${reserva.titulo}</td>
                <td>${reserva.fechaRetiro}</td>
                <td>${reserva.fechaDevolucion}</td>
                <td>${reserva.estado}</td>
                <td>
                    ${reserva.estado === 'vigente' ?
                        `<button onclick="marcarDevuelto(${reserva.id})">Marcar como devuelto</button>` :
                        'Devuelto'
                    }
                </td>
            `;
            tablaBody.appendChild(fila);

            if (reserva.estado === 'vigente') {
                vigentes++;
            }
        });

        contadorVigentes.textContent = vigentes;
    }

    window.marcarDevuelto = function(id) {
        let reservas = JSON.parse(localStorage.getItem('reservasBiblioteca'));
        const indice = reservas.findIndex(reserva => reserva.id === id);

        if (indice !== -1) {
            reservas[indice].estado = 'devuelto';
            localStorage.setItem('reservasBiblioteca', JSON.stringify(reservas));
            cargarReservas(buscadorInput.value);
        }
    };

    buscadorInput.addEventListener('input', function() {
        cargarReservas(this.value);
    });

    cargarReservas();
});