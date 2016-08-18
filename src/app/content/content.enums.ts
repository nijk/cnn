/**
 * Created by nijk on 14/03/2016.
 */

export enum Field {
    'title',
    'type',
    'body',
    'img',
    'vocabulary'
}

export enum Entity {
    'node',
    'term'
}

export enum APIResource {
    content = 'content' as any,
    contentByTerm = 'content/term' as any,
    termLanguage = 'taxonomy/language' as any
}
