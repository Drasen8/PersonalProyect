import axios from 'axios';

//Variables
let todosDatos=[];
let datos=[];

function obtenerUltimos7Dias() {
  const fechas = [];
  const fecha = new Date();  // Obtener la fecha actual

  // Bucle para obtener las fechas de los últimos 7 días
  for (let i = 0; i < 14; i++) {
    const fecha = new Date();  // Crear una nueva fecha basada en la actual
    fecha.setDate(fecha.getDate() - i);  // Restar 'i' días a la fecha actual
    if(fecha.getDay() !== 0){
    fechas.push(fecha.toISOString().split('T')[0].replace(/-/g, ''));  // Agregar la fecha en formato YYYY-MM-DD
    }
  }

  return fechas;
}

const ultimos7Dias = obtenerUltimos7Dias();
console.log(ultimos7Dias); 

// Función para obtener los datos del BOE para la fecha actual en formato YYYYMMDD
const fetchData = async () => {
  try {
    // Obtener la fecha actual en formato YYYYMMDD
    const today = new Date().toISOString().split('T')[0].replace(/-/g, '');
    const fechaa=20230329
    for (let k = 1; k < 7; k++) {
  
      if(datos != null){
        datos=[];
      }
    
    const response = await axios.get(`https://www.boe.es/datosabiertos/api/boe/sumario/${ultimos7Dias[k]}`);
     
    // Aquí accedes al array 'data'
    const boeData = response.data.data;
   
   

//Se obtienen las leyes del sumario de la fecha concreta
   
   if (boeData && boeData.sumario) {
    const sumario = boeData.sumario;
   if (sumario.diario) {
    for (const diario of sumario.diario) {
      if (diario.seccion) {
        for (const seccion of diario.seccion) {
          if (Array.isArray(seccion.departamento)) {
            for (const departamento of seccion.departamento) {
              if (departamento.epigrafe) {
                for (const epigrafe of departamento.epigrafe) {
                  if (epigrafe.item) {
                    const titulo = epigrafe.item.titulo; // Almacena el título en una variable
                    if (titulo && (titulo.startsWith("Ley") || titulo.startsWith("Real Decreto"))) {
                      datos.push(
                        epigrafe.item.identificador,
                        titulo,
                        epigrafe.item.url_pdf.texto
                      );
                      
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}

todosDatos.push(datos);
/*for (let i = 0; i < datos.length; i+=3) {
  let momentaneo= [datos[i],datos[i+1],datos[i+2]]
  todosDatos.push(momentaneo)
  console.log(momentaneo,"Asodkafosfb");
}*/
 
     
    
    }
    // Retornamos los datos para utilizarlos en el frontend

    return todosDatos;
  } catch (error) {
    if (error.response && error.response.status === 404) {
      console.log(`No se encontraron resultados para ${url}`);
    } else {
      console.error(`Error al obtener datos de la API: ${error}`);
      throw error;
    }
  }
};

export default fetchData;