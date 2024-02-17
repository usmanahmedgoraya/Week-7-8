import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { ContactsService } from './contacts.service';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { Contact } from './schemas/contact.schemas';
import { ApiBearerAuth, ApiCreatedResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';


@Controller('contacts')
export class ContactsController {
    constructor(private contactService: ContactsService) { }

    // Get
    @Get()
    async getALLContacts(): Promise<Contact[]> {
        return this.contactService.findAll()
    }

    // Get
    @Get("/user-contacts")
    @ApiBearerAuth('access-token')
    @UseGuards(JwtAuthGuard)
    async getALLUserContacts(
        @Req()
        req
    ): Promise<Contact[]> {
        return this.contactService.findUserAllContacts(req.user)
    }

    // Create 
    @Post()
    @ApiBearerAuth('access-token')
    @ApiCreatedResponse({
        description: 'The record has been successfully created.',
        type: Contact,
    })
    @UseGuards(JwtAuthGuard)
    async createContact(
        @Body()
        contact: CreateContactDto,
        @Req()
        req
    ): Promise<Contact> {
        return this.contactService.create(contact, req.user)
    }

    // Get Contact by Id
    @Get(":id")
    @ApiBearerAuth('access-token')
    async getContact(
        @Param("id")
        id: string,
    ): Promise<Contact> {
        return this.contactService.findById(id)
    }

    // Get Contact by Id
    @Put(":id")
    @ApiBearerAuth('access-token')
    async updateContact(
        @Body()
        contact: UpdateContactDto,
        @Param("id")
        id: string,
    ): Promise<Contact> {
        return this.contactService.updateContact(id, contact)
    }


    // Update Contact by Id
    @Delete(":id")
    @ApiBearerAuth('access-token')
    async delContact(
        @Param("id")
        id: string,
    ): Promise<{}> {
        return this.contactService.deleteContact(id)
    }



}
