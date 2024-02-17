import { ApiProperty } from "@nestjs/swagger";
import { User } from "src/auth/schema/user.schemas";

export class UpdateContactDto {
    @ApiProperty()
    readonly name: string;

    @ApiProperty()
    readonly relationship: string;

    @ApiProperty()
    readonly contact_no: number;

    @ApiProperty()
    readonly email: string;

    @ApiProperty()
    readonly address: string;

    // @ApiProperty()
    readonly user: User
}