import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import {
  IonHeader,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonTitle,
  IonContent,
  IonSpinner,
  IonIcon
} from '@ionic/angular/standalone';
import { DataService } from '../services/data';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.page.html',
  styleUrls: ['./detalle.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonHeader,
    IonToolbar,
    IonButtons,
    IonBackButton,
    IonTitle,
    IonContent,
    IonSpinner,
    IonIcon
  ]
})
export class DetallePage implements OnInit {
  cargando = false;
  digimon: any = null;
  nombreDigimon = '';
  detailId = '000';
  attribute = 'Data';
  type = 'Digital';

  constructor(
    private route: ActivatedRoute,
    private dataService: DataService
  ) {}

  ngOnInit() {
    this.nombreDigimon = this.route.snapshot.paramMap.get('name') || '';

    if (this.nombreDigimon) {
      this.cargando = true;
      this.dataService.getDigimonByName(this.nombreDigimon).subscribe({
        next: (res: any) => {
          this.digimon = res[0];
          this.detailId = this.getDetailId(this.digimon.name);
          this.attribute = this.getAttribute(this.digimon.level);
          this.type = this.getType(this.digimon.level);
          this.cargando = false;
        },
        error: (err: any) => {
          console.error('Error cargando el detalle:', err);
          this.cargando = false;
        }
      });
    }
  }

  private getDetailId(name: string) {
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = (hash * 31 + name.charCodeAt(i)) % 999;
    }
    return String(hash + 1).padStart(3, '0');
  }

  private getAttribute(level: string) {
    const normal = (level || '').toLowerCase();
    if (normal.includes('ultimate')) return 'Virus';
    if (normal.includes('champion')) return 'Data';
    if (normal.includes('rookie')) return 'Vaccine';
    if (normal.includes('fresh')) return 'Free';
    return 'Neutral';
  }

  private getType(level: string) {
    const normal = (level || '').toLowerCase();
    if (normal.includes('ultimate')) return 'Demon Lord';
    if (normal.includes('champion')) return 'Dragon';
    if (normal.includes('rookie')) return 'Beast';
    if (normal.includes('fresh')) return 'Baby';
    return 'Digital';
  }
}
