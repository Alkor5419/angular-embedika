import { Injectable, OnInit } from '@angular/core';
import { IAllPeople, IPerson } from '../model/persons';
import { ApolloError } from '@apollo/client/errors';
import { Apollo, gql } from 'apollo-angular';

const PERSONS = gql`
  query {
    allPeople {
      people {
        name
        gender
        height
        mass
        id
        skinColor
      }
    }
  }
`;

@Injectable({
  providedIn: 'root',
})
export class GetPeoplesService {
  persons: IPerson[] = [];
  personsCopy: IPerson[] = [];
  loading = true;
  error: ApolloError | undefined;
  constructor(private apollo: Apollo) {}

  fetchPeople(): void {
    this.apollo
      .watchQuery<IAllPeople>({ query: PERSONS })
      .valueChanges.subscribe((res) => {
        this.persons = res?.data?.allPeople?.people.slice(0, 5);
        this.personsCopy = res?.data?.allPeople?.people;
        this.loading = res.loading;
        this.error = res.error;
        console.log(this.persons);
      });
  }
}
