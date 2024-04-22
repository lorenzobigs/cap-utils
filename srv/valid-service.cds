using my.validexample as my from '../db/cap-valid-data-model';
using { trip as external } from './external/trip';

service ValidService @(requires : [
    'authenticated-user',
    'system-user'
    ])
{
    entity Books @(restrict : [{
        grant : ['READ'],
        to    : 'user'
    },
    {
        grant : ['READ','WRITE'],
        to    : 'admin'
    }]) as projection on my.Books;
    
    entity Authors  @(restrict : [{
        grant : ['READ'],
        to    : 'user'
    },
    {
        grant : ['READ','WRITE'],
        to    : 'admin'
    }]) as projection on my.Authors;

/*
    You should expose this entity in the same service. 
    It was implemented in the external-service.js only to show you how to do it.


    @readonly entity People  @(restrict : [{
        grant : ['READ'],
        to    : ['user','admin']
    }]) as projection on external.People;
*/
    @readonly entity UserAuthorizations as projection on my.UserAuthorizations;
}