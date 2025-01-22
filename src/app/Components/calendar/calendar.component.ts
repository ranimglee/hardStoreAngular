import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Cheque } from 'src/models/Cheque';
import { Status } from 'src/models/Cheque';

// Import FullCalendar plugins
import { CalendarOptions } from '@fullcalendar/core'; // Correct way to import CalendarOptions
import dayGridPlugin from '@fullcalendar/daygrid'; // Import the dayGridPlugin
import interactionPlugin from '@fullcalendar/interaction'; // Import the interactionPlugin


@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

  cheques: Cheque[] = [];
  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin, interactionPlugin],
    initialView: 'dayGridMonth',  // Ensure valid view type is set here
    events: []  // Add events dynamically or initialize here
  };
  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<Cheque[]>('http://localhost:8082/hardStore/api/cheques/getCheques').subscribe(data => {
      this.cheques = data.map(cheque => ({
        ...cheque,
        dateEmission: new Date(cheque.dateEmission),
        dateEncaissement: new Date(cheque.dateEncaissement)
      }));
      this.initializeCalendar();
    });
  }
  initializeCalendar(): void {
    console.log('Calendar Options:', this.calendarOptions);  // Log to inspect
    const events = this.cheques.map(cheque => ({
      title: `Cheque ${cheque.numeroCheque} - ${cheque.montant}€`,
      start: cheque.dateEmission,
      description: `Status: ${cheque.status} - Fournisseur: ${cheque.fournisseur.nom}`
    }));
  
    this.calendarOptions = {
      plugins: [dayGridPlugin, interactionPlugin],
      initialView: 'dayGridMonth',
      events: events,
      dateClick: this.handleDateClick.bind(this)
    };
  }
  
  
  
  handleDateClick(arg: any): void {
    console.log('Clicked date: ', arg.date);
  }
}
