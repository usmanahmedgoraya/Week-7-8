import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { User } from "src/auth/schema/user.schemas";

@Schema({
    timestamps: true
})

export class Contact {
    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    relationship: string;

    @Prop({ required: true })
    contact_no: number;

    @Prop({ unique: true, required: true })
    email: string;

    @Prop()
    address: string;

    @Prop({type:mongoose.Schema.Types.ObjectId,ref:"User"})
    user:User;
}

export const ContactSchema = SchemaFactory.createForClass(Contact);
