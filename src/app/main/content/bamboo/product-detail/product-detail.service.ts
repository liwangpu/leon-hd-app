import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { FuseUtils } from '../../../../core/fuseUtils';
import { Product } from "../../../toolkit/models/product";
import { ProductSpec } from "../../../toolkit/models/productspec";

@Injectable()
export class ProductDetailService implements Resolve<any>
{
    contacts: any[];
    chats: any[];
    user: any;//delete

    onChatSelected = new BehaviorSubject<any>(null);
    onContactSelected = new BehaviorSubject<any>(null);
    onChatsUpdated = new Subject<any>();
    onUserUpdated = new Subject<any>();
    onLeftSidenavViewChanged = new Subject<any>();
    onRightSidenavViewChanged = new Subject<any>();

    product: Product;
    currentEditSpec: ProductSpec;
    afterProductChange = new Subject<Product>();
    afterProductSpecChange = new Subject<ProductSpec>();
    constructor(private http: HttpClient) {
        this.user = { mood: 'dsfg', status: 'wer' };
    }




    /**
     * Get chat 
     * @param contactId
     * @returns {Promise<any>}
     */
    getChat(contactId) {
        return Promise.resolve([]);
    }

    /**
     * Create New Chat
     * @param contactId
     * @returns {Promise<any>}
     */
    createNewChat(contactId) {
        return Promise.resolve([]);
    }

    /**
     * Select Contact
     * @param contact
     */
    selectContact(contact) {
        this.onContactSelected.next(contact);
    }

    /**
     * Set user status
     * @param status
     */
    setUserStatus(status) {
        this.user.status = status;
    }

    /**
     * Update user data
     * @param userData
     */
    updateUserData(userData) {
        return Promise.resolve([]);
    }

    /**
     * Update the chat dialog
     * @param chatId
     * @param dialog
     * @returns {Promise<any>}
     */
    updateDialog(chatId, dialog): Promise<any> {
        return Promise.resolve([]);
        // return new Promise((resolve, reject) => {

        //     const newData = {
        //         id: chatId,
        //         dialog: dialog
        //     };

        //     this.http.post('api/chat-chats/' + chatId, newData)
        //         .subscribe(updatedChat => {
        //             resolve(updatedChat);
        //         }, reject);
        // });
    }

    /**
     * The Chat App Main Resolver
     * @param {ActivatedRouteSnapshot} route
     * @param {RouterStateSnapshot} state
     * @returns {Observable<any> | Promise<any> | any}
     */
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
        return new Promise((resolve, reject) => {
            Promise.all([
                this.getContacts(),
                this.getChats(),
                this.getUser()
            ]).then(
                ([contacts, chats, user]) => {
                    this.contacts = contacts;
                    this.chats = chats;
                    this.user = user;
                    resolve();
                },
                reject
            );
        });
    }

    /**
     * Get Contacts
     * @returns {Promise<any>}
     */
    getContacts(): Promise<any> {
        // return new Promise((resolve, reject) => {
        //     this.http.get('api/chat-contacts')
        //         .subscribe((response: any) => {
        //             resolve(response);
        //         }, reject);
        // });
        return Promise.resolve([]);
    }

    /**
     * Get Chats
     * @returns {Promise<any>}
     */
    getChats(): Promise<any> {
        // return new Promise((resolve, reject) => {
        //     this.http.get('api/chat-chats')
        //         .subscribe((response: any) => {
        //             resolve(response);
        //         }, reject);
        // });
        return Promise.resolve([]);
    }

    /**
     * Get User
     * @returns {Promise<any>}
     */
    getUser(): Promise<any> {
        // return new Promise((resolve, reject) => {
        //     this.http.get('api/chat-user')
        //         .subscribe((response: any) => {
        //             resolve(response[0]);
        //         }, reject);
        // });
        return Promise.resolve([]);
    }
}
