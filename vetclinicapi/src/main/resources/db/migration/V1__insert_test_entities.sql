INSERT INTO public.roles(
	id, authority)
	VALUES ('3ef0c37d-3788-4392-9691-e4d2dd57c324', 'CUSTOMER'),
	('6629f640-2627-45a6-b49e-0ac92699cab5', 'MANAGER'),
	('92fba499-251a-41a6-ac50-0ffafab39f9b', 'ADMIN'),
	('d9b351e2-d1f9-4824-aeac-836efc6c3c1b', 'VET');

INSERT INTO public.users(
	id, email, password, username)
	VALUES ('21c100f0-4949-486d-932d-84335e4a2ffa', 'email@gmail.com', '$2a$12$Alytb/tuIIj7iOdfTxwlBuybVmfo8ia5uyw8cIzZt0DKdBmYkQ.n.', 'username'),
	('e8b4233b-c6f1-4d53-bbe9-2c7658eaa536','random@gmail.com','$2a$12$Alytb/tuIIj7iOdfTxwlBuybVmfo8ia5uyw8cIzZt0DKdBmYkQ.n.','random'),
	('cb3524cb-f3ff-40ba-9a05-3156814d35d4','random154@gmail.com','$2a$12$Alytb/tuIIj7iOdfTxwlBuybVmfo8ia5uyw8cIzZt0DKdBmYkQ.n.','Username154');

INSERT INTO public.users_authorities(
	authorities_id, user_id)
	VALUES ('3ef0c37d-3788-4392-9691-e4d2dd57c324', '21c100f0-4949-486d-932d-84335e4a2ffa'),
	('3ef0c37d-3788-4392-9691-e4d2dd57c324','e8b4233b-c6f1-4d53-bbe9-2c7658eaa536'),
	('3ef0c37d-3788-4392-9691-e4d2dd57c324','cb3524cb-f3ff-40ba-9a05-3156814d35d4');

INSERT INTO public.pets(
	id, owner_id, breed, name, specie)
	VALUES ('57cf7587-2e68-4713-8eb0-750aa501941e', '21c100f0-4949-486d-932d-84335e4a2ffa', 'Husky', 'Tomas', 'Dog'),
	('4a6f0ca9-f927-428f-859c-b0ea5f863a55', '21c100f0-4949-486d-932d-84335e4a2ffa', 'Shorthair', 'Elsa', 'Cat'),
	('9edae777-85f8-43c2-8db5-11bc80414b54', 'cb3524cb-f3ff-40ba-9a05-3156814d35d4', 'Amazon Parrot', 'Coco', 'Parrot');


INSERT INTO public.vets(
	id, f_name, l_name, type_of_vet)
	VALUES ('266cd58b-263c-4bed-823a-f1065e3c3b4a','Anton', 'Lee', 'Veterinary Specialists'),
	('aead6f38-c42a-47f4-a41e-a15be35fcd81','Hector', 'McCall', 'Exotic Animal Veterinarian'),
	('86c8dc2b-f26d-418a-9a6e-ac5696e61b13','Brandon', 'Barker', 'Veterinary Specialists');