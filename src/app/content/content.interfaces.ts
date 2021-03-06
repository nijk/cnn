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
  promotedOnly?: boolean,
  term?: ITermLanguage
}

export interface ITermLanguage {
  title: string,
  slug: string,
  uuid: string,
  id: string,
  isActive: boolean,
  isPrevActive: boolean,
  promoted: boolean | string,
  body?: string,
  img?: string,
  vocabulary?: string,
  parentTitle?: string
}
