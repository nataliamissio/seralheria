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
  readonly galleryImages = [
    {
      src: '/assets/img/galeria/trabalho5.webp',
      alt: 'Projeto de serralheria em estrutura metálica - Trabalho 1'
    },
    {
      src: '/assets/img/galeria/trabalho1.webp',
      alt: 'Projeto de serralheria em estrutura metálica - Trabalho 2'
    },
    {
      src: '/assets/img/galeria/trabalho11.webp',
      alt: 'Projeto de serralheria em estrutura metálica - Trabalho 3'
    },
    {
      src: '/assets/img/galeria/trabalho6.webp',
      alt: 'Projeto de serralheria em estrutura metálica - Trabalho 4'
    },
    {
      src: '/assets/img/galeria/trabalho10.webp',
      alt: 'Projeto de serralheria em estrutura metálica - Trabalho 5'
    },
    {
      src: '/assets/img/galeria/trabalho3.webp',
      alt: 'Projeto de serralheria em estrutura metálica - Trabalho 6'
    },
    {
      src: '/assets/img/galeria/trabalho8.webp',
      alt: 'Projeto de serralheria em estrutura metálica - Trabalho 7'
    },
    {
      src: '/assets/img/galeria/trabalho2.webp',
      alt: 'Projeto de serralheria em estrutura metálica - Trabalho 8'
    },
    {
      src: '/assets/img/galeria/trabalho7.webp',
      alt: 'Projeto de serralheria em estrutura metálica - Trabalho 9'
    },
    {
      src: '/assets/img/galeria/trabalho12.webp',
      alt: 'Projeto de serralheria em estrutura metálica - Trabalho 10'
    },
    {
      src: '/assets/img/galeria/trabalho9.webp',
      alt: 'Projeto de serralheria em estrutura metálica - Trabalho 11'
    },
    {
      src: '/assets/img/galeria/trabalho4.webp',
      alt: 'Projeto de serralheria em estrutura metálica - Trabalho 12'
    }
  ];

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
