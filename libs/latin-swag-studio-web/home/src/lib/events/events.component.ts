import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'lsw-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {
  events = [
    {
      date: '01 January',
      name: 'Dance NOW! Mexico',
      location: 'Capital Hilton Mexica Mexico',
      weekday: 'Thursday',
      time: '12:00 am - 9:00 pm',
      year: 2020,
      cost: 25,
      qty: 'One Ticket',
      imageUrl:
        'https://dance-studio.cmsmasters.net/wp-content/uploads/2015/07/Depositphotos_5439336_original-300x300.jpg'
    },
    {
      date: '01 January',
      name: 'Dance NOW! Mexico',
      location: 'Capital Hilton Mexica Mexico',
      weekday: 'Thursday',
      time: '12:00 am - 9:00 pm',
      year: 2020,
      cost: 25,
      qty: 'One Ticket',
      imageUrl:
        'https://dance-studio.cmsmasters.net/wp-content/uploads/2015/07/Depositphotos_5439336_original-300x300.jpg'
    },
    {
      date: '01 January',
      name: 'Dance NOW! Mexico',
      location: 'Capital Hilton Mexica Mexico',
      weekday: 'Thursday',
      time: '12:00 am - 9:00 pm',
      year: 2020,
      cost: 25,
      qty: 'One Ticket',
      imageUrl:
        'https://dance-studio.cmsmasters.net/wp-content/uploads/2015/07/Depositphotos_5439336_original-300x300.jpg'
    }
  ];
  constructor() {}

  ngOnInit(): void {}
}
