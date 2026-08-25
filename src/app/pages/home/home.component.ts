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
  modalGaleriaSrc: string = '';
  modalGaleriaAlt: string = 'Imagem de projeto de serralheria da D Lima';

  abrirModalGaleria(src: string, alt: string) {
    this.modalGaleriaSrc = src;
    this.modalGaleriaAlt = alt;

    const modal = document.getElementById('galeriaModal');
    if (modal) {
      const bsModal = window.bootstrap?.Modal?.getOrCreateInstance(modal);
      if (bsModal) bsModal.show();
    }
  }
}
