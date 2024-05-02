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

     @readonly
    entity Events @(restrict: [{
        grant: ['READ'],
        to   : [
            'user',
            'admin'
        ]
    }])  as projection on my.Events;
/*
    You should expose this entity in the same service. 
    It was implemented in the external-service.js only to show you how to do it.


    @readonly entity People  @(restrict : [{
        grant : ['READ'],
        to    : ['user','admin']
    }]) as projection on external.People;
*/
    @readonly entity UserAuthorizations as projection on my.UserAuthorizations;

    /**
     * A function that receive a custom defined object "EventMessage", 
     * save it (via .js implementation) in the events entity
     * and returns an ack EventAcknowledgement
     */
    action add @(restrict: [
        {
            grant: ['WRITE'],
            to   : 'admin'
        }])(
            ID   : EventMessage:ID,
            time : EventMessage:time,
            name : EventMessage:name,
            category : EventMessage:category,
            status : EventMessage:status,
            artists : EventMessage:artists
            ) returns EventAcknowledgement;

    define type EventMessage {
        ID       :      UUID;
        time     :      DateTime;
        name     :      String;
        category :      String;
        status   :      String;
        artists  : many Artist ;

    }

    define type Artist {
        name : String;
    }

    define type EventAcknowledgement {
        acknowledge : String enum {
            succeeded;
            failed;
        };
        message     : String;
    }

}