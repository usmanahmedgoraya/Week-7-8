import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { User } from 'src/auth/schema/user.schemas';
import { Contact } from './schemas/contact.schemas';

@Injectable()
export class ContactsService {
    constructor(
        @InjectModel(Contact.name)
        private contactModel: mongoose.Model<Contact>) { }

    async findAll(): Promise<Contact[]> {
        const contacts = await this.contactModel.find();
        return contacts;
    }

    async findUserAllContacts(user: User): Promise<Contact[]> {
        // const userId = new mongoose.Types.ObjectId(user._id);
        const contacts = await this.contactModel.find({ user: user._id.toString() });
        return contacts;
    }

    async create(contact: Contact, user: User): Promise<Contact> {
        const data = Object.assign(contact, { user: user._id });
        const res = await this.contactModel.create(data);
        return res;
    }

    async findById(id: string): Promise<Contact> {
        const contact = await this.contactModel.findById(id);
        if (!contact) {
            throw new NotFoundException('Contact not found!')
        }
        return contact;
    }

    async updateContact(id: string, contact: Contact): Promise<Contact> {
        const updatedContact = await this.contactModel.findByIdAndUpdate(id, contact, { new: true, runValidators: true });
        return updatedContact;

    }

    async deleteContact(id: string): Promise<{}> {
        const contact = await this.contactModel.findByIdAndDelete(id);
        let res = { contact, success: true, msg: "The Contact is deleted Successfully" }
        return res;
    }


}
