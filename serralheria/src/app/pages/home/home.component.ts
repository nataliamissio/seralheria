import { Component } from '@angular/core';

import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  modalGaleriaSrc: string = '';

  abrirModalGaleria(src: string) {
    this.modalGaleriaSrc = src;
    // Abre o modal via Bootstrap JS
    const modal = document.getElementById('galeriaModal');
    if (modal) {
      // @ts-ignore
      const bsModal = window.bootstrap?.Modal?.getOrCreateInstance(modal);
      if (bsModal) bsModal.show();
    }
  }
}
