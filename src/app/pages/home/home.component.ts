import { Component } from '@angular/core';

declare global {
  interface Window {
    bootstrap?: {
      Modal?: {
        getOrCreateInstance: (element: Element) => { show: () => void };
      };
    };
  }
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  selectedGalleryIndex = 0;
  readonly galleryImages = [5, 1, 11, 6, 10, 3, 8, 2, 7, 12, 9, 4]
    .map((fileNumber, index) => ({
      src: `/assets/img/galeria/trabalho${fileNumber}.webp?v=20260901`,
      srcset: [360, 640]
        .map((width) => `/assets/img/galeria/trabalho${fileNumber}-${width}.webp?v=20260901 ${width}w`)
        .join(', '),
      alt: `Projeto de serralheria em estrutura metálica - Trabalho ${index + 1}`
    }));

  abrirModalGaleria(src: string, alt: string) {
    const imageIndex = this.galleryImages.findIndex((image) => image.src === src);
    this.selectedGalleryIndex = imageIndex >= 0 ? imageIndex : 0;

    const modal = document.getElementById('galeriaModal');
    if (modal) {
      const bsModal = window.bootstrap?.Modal?.getOrCreateInstance(modal);
      if (bsModal) bsModal.show();
    }
  }

  selecionarImagem(indice: number) {
    this.selectedGalleryIndex = indice;
  }
}
