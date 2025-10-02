document.addEventListener('DOMContentLoaded', () => {
  const botonesReservar = document.querySelectorAll('.btn-reservar');
  botonesReservar.forEach(boton => {
    boton.addEventListener('click', (evento) => {
      const tarjetaLibro = evento.target.closest('.tarjeta-libro');
      const codigoCatalogo = tarjetaLibro.getAttribute('data-isbn');
      window.location.href = `reserva.html?isbn=${codigoCatalogo}`;
    });
  });
});