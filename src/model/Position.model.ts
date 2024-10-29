import { Role } from "./Role.model";

export class PositionModel {
    id: number;
    name: string;
    companyId: number;
    roles: Array<Role>;

    constructor (
        id: number,
        name: string,
        companyId: number,
        roles: Array<Role>
    ) {
        this.id = id;
        this.name = name;
        this.companyId = companyId;
        this.roles = roles;
    }
}