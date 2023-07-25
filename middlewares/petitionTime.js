/*Después de que se haya completado la solicitud 
y se haya obtenido una respuesta, registra el tiempo
 de demora calculando la diferencia entre la marca de
 tiempo actual y la marca de tiempo registrada al
 comienzo del midd*/
export const addInitialTime = (req, _res, next) => {
    req.initialTime = Date.now();
    next()
  }

export const getPetitionTime = (initialTime) => {
    const finalTime = date.now()
    const timedifferenceInMS = finalTime - initialTime
    return timedifferenceInMS
  }
  