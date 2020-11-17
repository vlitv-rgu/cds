import { Component, OnInit } from '@angular/core';
import {PhotoService} from '../../services/photo.service';
import {CurrentDatePhotosInterface} from '../../interfaces/current-date-photos.interface';
import {PopoverService} from '../../../../../../../common/services/popover.service';
import {ShowImageComponent} from '../show-image/show-image.component';
import { RespectService } from '../../services/respect.service';

@Component({
  selector: 'app-current-respect',
  templateUrl: './current-respect.component.html',
  styleUrls: ['./current-respect.component.scss'],
})
export class CurrentRespectComponent implements OnInit {
  public currentDates: CurrentDatePhotosInterface[];

  // tslint:disable:variable-name
  private  _showImage = ShowImageComponent;
  constructor(private _photoService: PhotoService,
              private _popover: PopoverService,
              private _respect: RespectService) { }

  ngOnInit() {
    this._respect.curDates$.subscribe((dates: CurrentDatePhotosInterface[]) => {
      this.currentDates = dates;
    });
    this._respect.getCurrentDates();
  }

  public async fromCamera() {
    await this._photoService.addLocalImage(true);
  }

  public async fromGallery() {
    await this._photoService.addLocalImage(false);
  }

  public async showPicture(id: number) {
    await this._popover.showModal(this._showImage, { id });
  }

  public async showInfo() {
    await this._popover.showAlert('Организатор - Твоя мамаша. Телефон - есть у каждого. Комментарий - Ну ты и кадр)))');
  }
}
