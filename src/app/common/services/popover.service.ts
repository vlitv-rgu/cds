import {LoadingController, AlertController, ToastController, ModalController} from '@ionic/angular';
import {Injectable} from '@angular/core';
import {PopoverResponseInterface} from '../interfaces/popover-responce.interface';

@Injectable()
export class PopoverService {
    // tslint:disable:variable-name
    private _preloader;
    private _alert;
    private _toast;
    private _modal;

    constructor(
        private _loadingController: LoadingController,
        private _alertController: AlertController,
        private _toastController: ToastController,
        private _modalController: ModalController,
    )
    {
        this._createPreloader().then();
    }

    private async _createPreloader() {
        this._preloader = await this._loadingController.create({
            message: 'Загрузка...',
            animated: true,
            backdropDismiss: true,
        });
    }

    private async _createAlert(message: string, buttons: string[]) {
        this._alert = await this._alertController.create({
            header: 'Внимание',
            message,
            buttons,
        });
    }

    private async _createToast(message: string, success: boolean) {
        this._toast = await this._toastController.create({
            message,
            duration: 2000,
            position: 'top',
            color: success ? 'primary' : 'danger',
        });
    }

    private async _createModal(component: any, componentProps: any) {
        this._modal = await this._modalController.create({
            component,
            componentProps
        });
    }

    public async showPreloader() {
        await this._preloader.present();
    }

    public async hidePreloader(response: PopoverResponseInterface) {
        await this._preloader.dismiss();
        if (response.message) {
            await this.showToast(response.message, response.success);
        }
        this._createPreloader().then();
    }

    public async showAlert(message: string, buttons: string[] = ['OK']) {
        this._createAlert(message, buttons).then(() => {
            this._alert.present();
        });
    }

    public async showToast(message: string, success: boolean) {
        this._createToast(message, success).then(() => {
            this._toast.present();
        });
    }

    public async showModal(component: any, componentProps: any) {
        this._createModal(component, componentProps).then(() => {
            this._modal.present();
        });
    }

    public async hideModal() {
        await this._modal.dismiss();
    }
}
