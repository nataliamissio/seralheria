import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-orcamento',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './orcamento.component.html',
  styleUrl: './orcamento.component.css'
})
export class OrcamentoComponent implements OnInit {
  whatsappUrl = 'https://wa.me/5511984109502?text=Ol%C3%A1!%20Me%20chamo%20%5BSeu%20Nome%5D%20e%20gostaria%20de%20solicitar%20um%20or%C3%A7amento%20na%20DLima%20Estruturas%20Met%C3%A1licas.%20Poderia%20me%20ajudar%3F';

  constructor(private router: Router) {}

  ngOnInit() {
    setTimeout(() => {
  window.open(this.whatsappUrl, '_blank', 'noopener,noreferrer');
  this.router.navigate(['/']);
    }, 1000);
  }
}
