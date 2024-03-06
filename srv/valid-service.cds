using my.validexample as my from '../db/cap-valid-data-model';

service ValidService {
    entity Books as projection on my.Books;
    entity Authors as projection on my.Authors;
}