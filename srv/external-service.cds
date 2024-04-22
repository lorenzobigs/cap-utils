using { trip as external } from './external/trip';

service ExternalService @(requires : [
    'authenticated-user',
    'system-user'
    ])
{
    entity People @(restrict : [{
        grant : ['READ','WRITE'],
        to    : 'admin'
    }]) as projection on external.People;
    
}