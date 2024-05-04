const preguntas = [
    {
      titulo: "1. En el último mes, ¿con qué frecuencia ha estado afectado por algo que ha ocurrido inesperadamente?",
      opciones: [
        { textoRespuesta: "Nunca", valor: 0 },
        { textoRespuesta: "Casi Nunca", valor: 1 },
        { textoRespuesta: "De vez en cuando", valor: 2 },
        { textoRespuesta: "A menudo", valor: 3 },
        { textoRespuesta: "Muy a menudo", valor: 4 },
      ],
    },
    {
      titulo: "2. En el último mes, ¿con qué frecuencia se ha sentido incapaz de controlar las cosas importantes en su vida?",
      opciones: [
        { textoRespuesta: "Nunca", valor: 0 },
        { textoRespuesta: "Casi Nunca", valor: 1 },
        { textoRespuesta: "De vez en cuando", valor: 2 },
        { textoRespuesta: "A menudo", valor: 3 },
        { textoRespuesta: "Muy a menudo", valor: 4 },
      ],
    },
    {
      titulo: "3. En el último mes, ¿con qué frecuencia se ha sentido nervioso o estresado?",
      opciones: [
        { textoRespuesta: "Nunca", valor: 0 },
        { textoRespuesta: "Casi Nunca", valor: 1 },
        { textoRespuesta: "De vez en cuando", valor: 2 },
        { textoRespuesta: "A menudo", valor: 3 },
        { textoRespuesta: "Muy a menudo", valor: 4 },
      ],
    },
    {
      titulo: "4. En el último mes, ¿con qué frecuencia ha manejado con éxito los pequeños problemas irritantes de la vida?",
      opciones: [
        { textoRespuesta: "Nunca", valor: 4 },
        { textoRespuesta: "Casi Nunca", valor: 3 },
        { textoRespuesta: "De vez en cuando", valor: 2 },
        { textoRespuesta: "A menudo", valor: 1 },
        { textoRespuesta: "Muy a menudo", valor: 0 },
      ],
    },
    {
      titulo: "5. En el último mes, ¿con qué frecuencia ha sentido que ha afrontado efectivamente los cambios importantes que han estado ocurriendo en su vida?",
      opciones: [
        { textoRespuesta: "Nunca", valor: 4 },
        { textoRespuesta: "Casi Nunca", valor: 3 },
        { textoRespuesta: "De vez en cuando", valor: 2 },
        { textoRespuesta: "A menudo", valor: 1 },
        { textoRespuesta: "Muy a menudo", valor: 0 },
      ],
    },
    {
      titulo: "6. En el último mes, ¿con qué frecuencia ha estado seguro sobre su capacidad para manejar sus problemas personales?",
      opciones: [
        { textoRespuesta: "Nunca", valor: 4 },
        { textoRespuesta: "Casi Nunca", valor: 3 },
        { textoRespuesta: "De vez en cuando", valor: 2 },
        { textoRespuesta: "A menudo", valor: 1 },
        { textoRespuesta: "Muy a menudo", valor: 0 },
      ],
    },
    {
      titulo: "7. En el último mes, ¿con qué frecuencia ha sentido que las cosas le van bien?",
      opciones: [
        { textoRespuesta: "Nunca", valor: 4 },
        { textoRespuesta: "Casi Nunca", valor: 3 },
        { textoRespuesta: "De vez en cuando", valor: 2 },
        { textoRespuesta: "A menudo", valor: 1 },
        { textoRespuesta: "Muy a menudo", valor: 0 },
      ],
    },
    {
      titulo: "8. En el último mes, ¿con qué frecuencia ha sentido que no podía afrontar todas las cosas que tenía que hacer?",
      opciones: [
        { textoRespuesta: "Nunca", valor: 4 },
        { textoRespuesta: "Casi Nunca", valor: 3 },
        { textoRespuesta: "De vez en cuando", valor: 2 },
        { textoRespuesta: "A menudo", valor: 1 },
        { textoRespuesta: "Muy a menudo", valor: 0 },
      ],
    },
    {
      titulo: "9. En el último mes, ¿con qué frecuencia ha podido controlar las dificultades de su vida?",
      opciones: [
        { textoRespuesta: "Nunca", valor: 4 },
        { textoRespuesta: "Casi Nunca", valor: 3 },
        { textoRespuesta: "De vez en cuando", valor: 2 },
        { textoRespuesta: "A menudo", valor: 1 },
        { textoRespuesta: "Muy a menudo", valor: 0 },
      ],
    },
    {
      titulo: "10. En el último mes, ¿con qué frecuencia se ha sentido que tenía todo bajo control?",
      opciones: [
        { textoRespuesta: "Nunca", valor: 4 },
        { textoRespuesta: "Casi Nunca", valor: 3 },
        { textoRespuesta: "De vez en cuando", valor: 2 },
        { textoRespuesta: "A menudo", valor: 1 },
        { textoRespuesta: "Muy a menudo", valor: 0 },
      ],
    },
    {
      titulo: "11. En el último mes, ¿con qué frecuencia ha estado enfadado porque las cosas que le han ocurrido estaban fuera de su control?",
      opciones: [
        { textoRespuesta: "Nunca", valor: 4 },
        { textoRespuesta: "Casi Nunca", valor: 3 },
        { textoRespuesta: "De vez en cuando", valor: 2 },
        { textoRespuesta: "A menudo", valor: 1 },
        { textoRespuesta: "Muy a menudo", valor: 0 },
      ],
    },
    {
      titulo: "12. En el último mes, ¿con qué frecuencia ha pensado sobre las cosas que le quedan por hacer?",
      opciones: [
        { textoRespuesta: "Nunca", valor: 0 },
        { textoRespuesta: "Casi Nunca", valor: 1 },
        { textoRespuesta: "De vez en cuando", valor: 2 },
        { textoRespuesta: "A menudo", valor: 3 },
        { textoRespuesta: "Muy a menudo", valor: 4 },
      ],
    },
    {
      titulo: "13. En el último mes, ¿con qué frecuencia ha podido controlar la forma de pasar el tiempo?",
      opciones: [
        { textoRespuesta: "Nunca", valor: 4 },
        { textoRespuesta: "Casi Nunca", valor: 3 },
        { textoRespuesta: "De vez en cuando", valor: 2 },
        { textoRespuesta: "A menudo", valor: 1 },
        { textoRespuesta: "Muy a menudo", valor: 0 },
      ],
    },
    {
      titulo: "14. En el último mes, ¿con qué frecuencia ha sentido que las dificultades se acumulan tanto que no puede superarlas?",
      opciones: [
        { textoRespuesta: "Nunca", valor: 0 },
        { textoRespuesta: "Casi Nunca", valor: 1 },
        { textoRespuesta: "De vez en cuando", valor: 2 },
        { textoRespuesta: "A menudo", valor: 3 },
        { textoRespuesta: "Muy a menudo", valor: 4 },
      ],
    },
    {
      titulo: "Resultado de test",
      resultado: [
        { textoResultado: "Escala de Estrés Percibido" }, // No se define un valor para el resultado
      ],
    },
  ];
  
  export default preguntas;
  