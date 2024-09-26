import axios from 'axios';

// Función para obtener los datos del BOE para la fecha actual en formato YYYYMMDD
const fetchData = async () => {
  try {
    // Obtener la fecha actual en formato YYYYMMDD
    const today = new Date().toISOString().split('T')[0].replace(/-/g, '');
    const fecha=20240923;
    const response = await axios.get(`https://www.boe.es//datosabiertos/api/legislacion-consolidada`);
     
    // Aquí accedes al array 'data'
    const boeData = response.data.data;
    let datos=[];
    const todosDatos=[];
    // Recorremos el array para obtener los títulos
    boeData.forEach(item => {
      datos.push(item.numero_oficial
      ,item.identificador
      ,item.fecha_disposicion
      ,item.fecha_publicacion
      ,item.fecha_vigencia
      ,item.titulo
      ,item.url_eli)
      todosDatos.push(datos)
      datos=[];
    });
console.log(todosDatos[1])
    return todosDatos; // Retornamos los datos si queremos usarlos más adelante

     
   
  } catch (error) {
    console.error('Error al obtener datos de la API:', error);
    throw error;
  }
};

export default fetchData;