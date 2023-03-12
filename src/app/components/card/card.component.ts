import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IPerson } from 'src/app/model/persons';
import { GetPeoplesService } from 'src/app/services/get-peoples.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent {
  id: string;
  person: IPerson | undefined;
  constructor(
    private getPeoples: GetPeoplesService,
    private activateRoute: ActivatedRoute
  ) {
    this.id = activateRoute.snapshot.params['id'];
    this.person = this.getPeoples.persons.find((el) => {
      return el.id === this.id;
    });
  }
}
