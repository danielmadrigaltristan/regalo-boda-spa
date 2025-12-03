import { Injectable, signal } from '@angular/core';

export interface Prueba {
  id: number;
  titulo: string;
  descripcion: string;
  codigo: string;
  completada: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class PruebasService {
  private pruebas: Prueba[] = [
    {
      id: 1,
      titulo: 'Toques con el balón ⚽',
      descripcion: 'Las fuerzas del universo del fútbol se enfrentan una vez más... pero esta vez, en nombre del amor!\n\n Uno será el orgulloso defensor del Real Madrid, el otro la fiera pasión del Barça.Vestidos con sus colores, debereis demostrar que en vuestra relación hay tanto juego en equipo como rivalidad.\n\nEl reto es simple… o eso parece:\n\nCada uno deberá mantener el balón en el aire y dar 10 toques… Ni el viento, ni las risas, ni las miradas cómplices pueden distraeros. Si el balón cae… el orgullo también.¿Podreis mantener la paz entre tanto toque, o el Clásico romperá la pareja antes que el balón toque el suelo?\n\nY no os olvideis, para que el VAR lo pueda valorar, grabado debe quedar.',
      codigo: 'T0QU35',
      completada: false
    },
    {
      id: 2,
      titulo: 'El himno de la gloria y la purpurina 🦄',
      descripcion: 'Atención, pareja: el pueblo de Villalba de Duero os necesita. El equipo local no tiene himno decente y ha llegado la hora de solucionarlo.\n\nVuestra misión: componer y cantar un temazo digno de sonar en los altavoces del estadio… o al menos en el bar después del partido.\n\nLa actuación será en pleno partido, disfrazados de unicornios (sí, con cuerno, purpurina y todo el flow), y usando el micrófono legendario.\n\nDespués del conciertazo, os toca hacer de reporteros: entrevistad al público y preguntadles qué les ha parecido vuestro hit. \n\nSi conseguís que alguien cante con vosotros o que el bar os invite a una ronda, misión más que cumplida.\n\nRecompensa: fama local, muchas risas y un recuerdo que Villalba no olvidará jamás.\n\nRecordad, la prueba debeis grabar para que el VAR pueda volver a valorar',
      codigo: 'H1MN0',
      completada: false
    },
    {
      id: 3,
      titulo: 'La acampada pendiente ⛺',
      descripcion: 'Ha llegado el momento de ajustar cuentas con el pasado.\n\nHace años hubo una acampada legendaria… en la que cuentan las malas lenguas que Ivan y alguno que otro acompañante no estuvieron invitados 😏.\n\nAhora toca el momento de la reconciliación: grabáos montando una tienda de campaña, como hubierais hecho en los viejos tiempos, demostrando que vuestro amor puede sobrevivir a las piquetas, los nudos y las discusiones de “eso no va ahí”.\n\nCuando la tengáis montada (o algo parecido), Elena deberá dejar claro de alguna forma que, por fin, le invita a acampar con ella.\n\nPuede ser con una frase, un gesto, un beso o simplemente diciendo:👉 “Venga, pasa… que esta vez sí te dejo quedarte.”',
      codigo: 'T13ND4',
      completada: false
    }
  ];

  currentPruebaIndex = signal(0);
  allCompleted = signal(false);

  getPruebaActual(): Prueba | null {
    const index = this.currentPruebaIndex();
    return index < this.pruebas.length ? this.pruebas[index] : null;
  }

  verificarCodigo(codigo: string): boolean {
    const pruebaActual = this.getPruebaActual();
    if (!pruebaActual) return false;

    if (codigo.toUpperCase() === pruebaActual.codigo) {
      pruebaActual.completada = true;
      const nextIndex = this.currentPruebaIndex() + 1;
      
      if (nextIndex >= this.pruebas.length) {
        this.allCompleted.set(true);
      } else {
        this.currentPruebaIndex.set(nextIndex);
      }
      return true;
    }
    return false;
  }

  getTotalPruebas(): number {
    return this.pruebas.length;
  }

  getPruebasCompletadas(): number {
    return this.pruebas.filter(p => p.completada).length;
  }

  resetPruebas(): void {
    this.pruebas.forEach(p => p.completada = false);
    this.currentPruebaIndex.set(0);
    this.allCompleted.set(false);
  }
}