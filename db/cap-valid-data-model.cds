namespace my.validexample;
using {cuid,managed} from '@sap/cds/common';


entity Books : cuid,managed {
  title : String not null;
  edition : Integer  @assert.range: [ 1, 5 ];
  price : Decimal  @assert.range: [ 2.1, 19.99 ];
  availability_date : DateTime @assert.range: ['2018-10-31', '2024-01-15'];
  hype : String   @assert.range enum { high; medium; low; };
  author : Association to Authors @assert.target;
}

@assert.unique: {
  name: [name]
}
entity Authors : managed{
  key ID :  UUID;
  name   : String;
  favorite : Boolean @mandatory;
  books  : Association to many Books on books.author = $self;
}

entity Events : cuid,managed {
    time: DateTime;
    name: String;
    category: String;
    status : String;
    Artists : Composition of many EventsArtists on Artists.parent = $self;
}

entity EventsArtists : cuid,managed {
    key parent : Association to Events;
    name: String
}

@cds.persistence.skip
entity UserAuthorizations {
  key user : String;
  isAdmin : Boolean;
  isUser : Boolean;
}