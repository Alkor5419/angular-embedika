import { IPerson, IAllPeople, ISkinColor } from '../../model/persons';
import { Component } from '@angular/core';
import { GetPeoplesService } from 'src/app/services/get-peoples.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  searchText = '';
  skinColorValue: ISkinColor[] = [];
  genderFilter = '';
  personsCount: number = 5;
  page: number = 0;
  constructor(public getPeoples: GetPeoplesService) {}
  getIsSkinColor(color: string): string {
    return this.skinColorValue.find((el) => el.skinColor === color)
      ? '../../../assets/on.svg'
      : '../../../assets/off.svg';
  }
  getIsGender(color: string): string {
    return this.genderFilter === color
      ? '../../../assets/circle-on.svg'
      : '../../../assets/circle-off.svg';
  }
  nextPage(): void {
    this.page = this.page + 1;
    this.getPeoples.persons = this.getPeoples.personsCopy;
    this.getPeoples.persons = this.getPeoples.persons.slice(
      this.page * this.personsCount,
      this.page * this.personsCount + this.personsCount
    );
  }
  lastPage(): void {
    this.page = this.page - 1;
    this.getPeoples.persons = this.getPeoples.personsCopy;
    this.getPeoples.persons = this.getPeoples.persons.slice(
      this.page * this.personsCount,
      this.page * this.personsCount + this.personsCount
    );
  }
  handleClickSkin(skinColor: string, id: number): any {
    if (this.skinColorValue.find((el) => el.id === id)) {
      this.skinColorValue = this.skinColorValue.filter((el) => el.id !== id);
      this.getPeoples.persons = this.getPeoples.personsCopy;
      this.getPeoples.persons = this.getPeoples.persons.filter((el) => {
        return this.skinColorValue.some((it) => it.skinColor === el.skinColor);
      });
      return;
    }
    this.skinColorValue.push({ skinColor, id });
    this.getPeoples.persons = this.getPeoples.personsCopy;
    this.getPeoples.persons = this.getPeoples.persons.filter((el) => {
      return this.skinColorValue.some((it) => it.skinColor === el.skinColor);
    });
  }
  handleClickGender(gender: string): void {
    this.getPeoples.persons = this.getPeoples.personsCopy;
    this.genderFilter = gender;
    this.getPeoples.persons = this.getPeoples.persons.filter(
      (el) => el.gender.toLocaleLowerCase() === gender.toLocaleLowerCase()
    );
  }
  ngOnInit(): void {
    this.getPeoples.fetchPeople();
  }
}
