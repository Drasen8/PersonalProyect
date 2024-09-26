import axios from 'axios';

// Función para obtener los datos del BOE para la fecha actual en formato YYYYMMDD
const fetchData = async () => {
  try {
    // Obtener la fecha actual en formato YYYYMMDD
    const today = new Date().toISOString().split('T')[0].replace(/-/g, '');
    const fecha=20230329

    const response = await axios.get(`https://www.boe.es/datosabiertos/api/boe/sumario/${fecha}`);
     
    // Aquí accedes al array 'data'
    const boeData = response.data.data;
    let todosDatos=[];
    let datos=[];
   

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

for (let i = 0; i < datos.length; i+=3) {
  let momentaneo= [datos[i],datos[i+1],datos[i+2]]
  todosDatos.push(momentaneo)
  console.log(momentaneo);
}

console.log(todosDatos);
    return todosDatos; // Retornamos los datos si queremos usarlos más adelante

     
   
  } catch (error) {
    console.error('Error al obtener datos de la API:', error);
    throw error;
  }
};

export default fetchData;