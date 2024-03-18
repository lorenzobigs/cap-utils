using { nw as external } from './external/nw';

service ExternalService @(requires : [
    'authenticated-user',
    'system-user'
    ])
{
    entity Categories @(restrict : [{
        grant : ['READ,WRITE'],
        to    : 'Basic_Scope'
    }]) as projection on external.Categories;
    
}