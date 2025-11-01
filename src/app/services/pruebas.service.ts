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
      titulo: 'Toques con el balón',
      descripcion: 'Debes hacer 10 toques seguidos con el balón sin que toque el suelo. Una vez completado, introduce el código que encontrarás escondido.',
      codigo: 'BALON10',
      completada: false
    },
    {
      id: 2,
      titulo: 'Canción de amor',
      descripcion: 'Canta la primera estrofa de vuestra canción favorita. El código está en la letra número 15 de la canción.',
      codigo: 'MUSIC15',
      completada: false
    },
    {
      id: 3,
      titulo: 'Baile en pareja',
      descripcion: 'Bailad vuestra coreografía especial durante 2 minutos. El código está en el lugar donde os conocisteis.',
      codigo: 'DANCE2M',
      completada: false
    },
    {
      id: 4,
      titulo: 'Declaración de amor',
      descripcion: 'Escribid en un papel 3 razones por las que os amáis. El código es la suma de las letras de vuestros nombres.',
      codigo: 'LOVE123',
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