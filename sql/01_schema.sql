create table menu
(
   id          integer          not null primary key,
   name        varchar          not null,
   description varchar          not null,
   price       double precision not null,
   image       varchar          not null,
   calorie     integer          not null,
   category    varchar          not null,
   lat         double precision not null,
   lng         double precision not null
);
