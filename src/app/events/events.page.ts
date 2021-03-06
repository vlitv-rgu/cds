import {Component, OnInit, ViewChild} from '@angular/core';
import {IEvent} from 'ionic2-calendar/calendar';
import {AddEventComponent} from './entities/components/add-event/add-event.component';
import {CurrentDateEventComponent} from './entities/components/current-date-event/current-date-event.component';
import {CalendarComponent} from 'ionic2-calendar';
import {IonNavLink} from '@ionic/angular';
import {EventsService} from './entities/services/events.service';
import {SharedService} from '../common/services/shared.service';
import {IEventInterface} from './entities/interfaces/ievent.interface';
import {CdsComponentClass} from '../common/classes/cds-component-class';


@Component({
  selector: 'app-events',
  templateUrl: './events.page.html',
  styleUrls: ['./events.page.scss'],
})
export class EventsPage extends CdsComponentClass implements OnInit {
  public currentEvents: IEvent[] = [];
  public calendarTitle: string;
  public currentDate = new Date();

  public addEventPage = AddEventComponent;
  public currentDateEventPage = CurrentDateEventComponent;

  @ViewChild(CalendarComponent) calendar: CalendarComponent;
  @ViewChild('curDatNavLink', {static: false}) curDatNavLink: IonNavLink;

  public isUserAdmin: boolean;

  // tslint:disable:variable-name
  constructor(private _eventTableService: EventsService,
              private _shared: SharedService) {
    super();
  }

  ngOnInit() {
    this._observeSafe(this._eventTableService.iEvents$).subscribe( (items: IEventInterface[]) => {
      this.currentEvents = [];
      if (items && items.length) {
        items.forEach((item: IEventInterface) => {
          this.currentEvents.push({
            allDay: false,
            title: item.title,
            startTime: new Date(item.date.year, item.date.month - 1, item.date.day, item.startTime.hours, item.startTime.minutes),
            endTime: new Date(item.date.year, item.date.month - 1, item.date.day, item.endTime.hours, item.endTime.minutes)
          });
        });
      }
    });
    this._observeSafe(this._shared.isUserAdmin$$).subscribe((data) => {
      this.isUserAdmin = data;
    });

    // если до этого не было соединения с интернетом
    if (!this.currentEvents?.length) {
      this._eventTableService.getIEvents();
      this._shared.checkAdminRules();
    }
  }

  public onViewTittleChanged(title): void {
    const months = [
      { en: 'January', ru: 'Январь' },
      { en: 'February', ru: 'Февраль'},
      { en: 'March', ru: 'Март'},
      { en: 'April', ru: 'Апрель'},
      { en: 'May', ru: 'Май'},
      { en: 'June', ru: 'Июнь'},
      { en: 'July', ru: 'Июль'},
      { en: 'August', ru: 'Август'},
      { en: 'September', ru: 'Сентябрь'},
      { en: 'October', ru: 'Октябрь' },
      { en: 'November', ru: 'Ноябрь' },
      { en: 'December', ru: 'Декабрь' },
    ];
    const currentMonth = months.find(item => title.includes(item.en));
    this.calendarTitle = title.replace(currentMonth.en, currentMonth.ru);
  }
  public nextMonth(): void {
    this.calendar.slideNext();
  }
  public prevMonth(): void {
    this.calendar.slidePrev();
  }

  public changeCurrentDate(): void {
    if (this.calendar) {
      this.currentDate = this.calendar.currentDate;
    }
  }

  public isCurrentDayButtonEnabled(): boolean {
    if (this.currentEvents.find((item: IEvent) => {
      return item.startTime.getDate() === this.currentDate.getDate()
          && item.startTime.getMonth() === this.currentDate.getMonth()
          && item.startTime.getFullYear() === this.currentDate.getFullYear();
    }))
    {
      if (this.curDatNavLink) {
        this.curDatNavLink.component = this.currentDateEventPage;
      }
      return true;
    }
    else {
      if (this.curDatNavLink) {
        this.curDatNavLink.component = undefined;
      }
      return false;
    }
  }

  public updateIEvents(event): void {
    this._eventTableService.getIEvents();
    this._shared.checkAdminRules();
    event.target.complete();
  }

}
