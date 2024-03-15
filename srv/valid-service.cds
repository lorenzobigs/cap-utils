using my.validexample as my from '../db/cap-valid-data-model';

service ValidService @(requires : [
    'authenticated-user',
    'system-user'
    ])
{
    entity Books @(restrict : [{
        grant : ['READ,WRITE'],
        to    : 'Basic_Scope'
    }]) as projection on my.Books;
    
    entity Authors  @(restrict : [{
        grant : ['READ,WRITE'],
        to    : 'Basic_Scope'
    }]) as projection on my.Authors;
}