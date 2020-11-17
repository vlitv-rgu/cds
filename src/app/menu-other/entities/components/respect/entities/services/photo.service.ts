import {Injectable} from '@angular/core';
import {CameraOptions, CameraResultType, CameraSource, Plugins} from '@capacitor/core';
import {PhotoInterface} from '../interfaces/photo.interface';
import {BehaviorSubject, Observable} from 'rxjs';

const { Camera } = Plugins;

@Injectable()

export class PhotoService {
    // tslint:disable:variable-name
    private _localPhotos: PhotoInterface[] = [];
    private _localPhotos$$: BehaviorSubject<PhotoInterface[]> = new BehaviorSubject(null);
    public localPhotos$: Observable<PhotoInterface[]> = this._localPhotos$$ as Observable<PhotoInterface[]>;

  constructor() { }

  private async _addNewToGallery(options: CameraOptions) {
    Camera.getPhoto(options).then((imageData) => {
        const curStr = `data:image/${imageData.format};base64,`;
        this._localPhotos.push( {
            id: null,
            localViewPath: curStr + imageData.base64String,
        });
        this._localPhotos$$.next(this._localPhotos);
    });
  }

  public async addLocalImage(fromCamera: boolean) {
      await this._addNewToGallery( {
          resultType: CameraResultType.Base64,
          source: fromCamera ? CameraSource.Camera : CameraSource.Photos,
          quality: 100,
          saveToGallery: false,
      } );
  }

  public clearLocalPhotos(): void {
      this._localPhotos = [];
      this._localPhotos$$.next(null);
  }
}
