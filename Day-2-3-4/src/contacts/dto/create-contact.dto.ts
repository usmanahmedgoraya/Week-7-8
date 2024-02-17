import { User } from "../../auth/schema/user.schemas";
import { ApiProperty } from '@nestjs/swagger';

export class CreateContactDto {
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