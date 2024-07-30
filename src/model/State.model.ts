
export class StateModel {
    id: number;
    name: string;
    acronym: string;

    constructor (
        id: number,
        name: string,
        acronym: string,
    ) {
        this.id = id;
        this.name = name;
        this.acronym = acronym;
    }
}