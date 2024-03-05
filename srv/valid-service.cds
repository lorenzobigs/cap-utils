using my.validexample as my from '../db/cap-valid-data-model';

service CatalogService {
    entity Foo as projection on my.Foo;
}