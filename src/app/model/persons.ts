export interface IAllPeople {
  allPeople: {
    people: [
      {
        name: string;
        gender: string;
        height: number;
        mass: number;
        id: string;
        skinColor: string;
      }
    ];
  };
}
export interface IPerson {
  name: string;
  gender: string;
  height: number;
  mass: number;
  id: string;
  skinColor: string;
}
export interface ISkinColor {
  skinColor: string;
  id: number;
}
