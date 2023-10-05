CREATE TABLE IF NOT EXISTS public.roles
(
    id uuid NOT NULL,
    authority character varying(255) COLLATE pg_catalog."default",
    CONSTRAINT roles_pkey PRIMARY KEY (id),
    CONSTRAINT roles_authority_check CHECK (authority::text = ANY (ARRAY['MANAGER'::character varying, 'CUSTOMER'::character varying, 'ADMIN'::character varying, 'VET'::character varying]::text[]))
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.roles
    OWNER to admin;

CREATE TABLE IF NOT EXISTS public.users
(
    id uuid NOT NULL,
    email character varying(255) COLLATE pg_catalog."default",
    password character varying(255) COLLATE pg_catalog."default",
    username character varying(255) COLLATE pg_catalog."default",
    CONSTRAINT users_pkey PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.users
    OWNER to admin;


CREATE TABLE IF NOT EXISTS public.users_authorities
(
    authorities_id uuid NOT NULL,
    user_id uuid NOT NULL,
    CONSTRAINT users_authorities_pkey PRIMARY KEY (authorities_id, user_id),
    CONSTRAINT fk40fukc61kvbvpc2rhv01q1g2l FOREIGN KEY (authorities_id)
        REFERENCES public.roles (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT fkq3lq694rr66e6kpo2h84ad92q FOREIGN KEY (user_id)
        REFERENCES public.users (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.users_authorities
    OWNER to admin;


CREATE TABLE IF NOT EXISTS public.pets
(
    id uuid NOT NULL,
    owner_id uuid,
    breed character varying(255) COLLATE pg_catalog."default" NOT NULL,
    name character varying(255) COLLATE pg_catalog."default" NOT NULL,
    specie character varying(255) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT pets_pkey PRIMARY KEY (id),
    CONSTRAINT fkoygstexeo9ivoylgrdrv2tc39 FOREIGN KEY (owner_id)
        REFERENCES public.users (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.pets
    OWNER to admin;


CREATE TABLE IF NOT EXISTS public.vets
(
    id uuid NOT NULL,
    f_name character varying(255) COLLATE pg_catalog."default" NOT NULL,
    l_name character varying(255) COLLATE pg_catalog."default" NOT NULL,
    type_of_vet character varying(255) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT vets_pkey PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.vets
    OWNER to admin;

CREATE TABLE IF NOT EXISTS public.visits
(
    date date,
    "time" time(6) without time zone,
    id uuid NOT NULL,
    pet_id uuid,
    user_id uuid,
    vet_id uuid,
    description character varying(255) COLLATE pg_catalog."default",
    CONSTRAINT visits_pkey PRIMARY KEY (id),
    CONSTRAINT fk5kmnbgokfpcalwrminoedrb68 FOREIGN KEY (user_id)
        REFERENCES public.users (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT fk6jcifhlqqlsfseu67utlouauy FOREIGN KEY (pet_id)
        REFERENCES public.pets (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT fk8036qgt84d8h5cckxrj952qoe FOREIGN KEY (vet_id)
        REFERENCES public.vets (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.visits
    OWNER to admin;