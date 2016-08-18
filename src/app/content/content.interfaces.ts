/**
 * Created by nijk on 11/03/2016.
 */

import { Field } from './content.enums.ts';

export interface IContent {
    title: string,
    type: string,
    body?: string,
    img?: string,
}
export interface IQueryOptions {
    promotedOnly: boolean,
    term?: ITermLanguage
}

export interface ITermLanguage {
    title: string,
    uuid: string,
    id: string,
    promoted: boolean | string,
    body?: string,
    img?: string,
    vocabulary?: string,
    parentTitle?: string,
    slug?: string
}
