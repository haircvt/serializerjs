/*
 * This file is part of the JsSerializer package.
 *
 * (c) HAIRCVT <hello@haircvt.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { ANONYMOUS_TYPE, CUSTOMER_TYPE, ADMIN_TYPE } from './UserType';

export default class User {
    /**
     * @param {string}   firstname
     * @param {string}   lastname
     * @param {Symbol}   type      {@see Type}
     * @param {?boolean} gender    True for female, false for male and null for unknown
     */
    constructor(firstname, lastname, type, gender) {
        this.firstname = firstname;
        this.lastname = lastname;
        this._type = type;
        this._gender = gender;
    }

    getFullname() {
        return `${this.firstname} ${this.lastname}`;
    }

    isAnonymous() {
        return ANONYMOUS_TYPE === this._type;
    }

    isCustomer() {
        return CUSTOMER_TYPE === this._type;
    }

    isAdmin() {
        return ADMIN_TYPE === this._type;
    }

    isMale() {
        return false === this._gender;
    }

    isFemale() {
        return true === this._gender;
    }

    genderIsKnown() {
        return null === this._gender;
    }
}
