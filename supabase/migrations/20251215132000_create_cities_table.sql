-- Create cities table
create table if not exists public.cities (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  state text, 
  description text,
  meta_description text,
  hero_image text,
  highlights text[] default '{}',
  is_active boolean default true,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table public.cities enable row level security;

-- Policies
create policy "Cities are viewable by everyone"
  on public.cities for select
  using (true);

-- Seed data
insert into public.cities (slug, name, state, description, highlights, hero_image, meta_description) values
('merida', 'Mérida', 'Yucatán', 'Capital de Yucatán, la Ciudad Blanca conocida por su arquitectura colonial, cenotes cercanos y rica tradición gastronómica yucateca.', ARRAY['Cenotes', 'Zonas Mayas', 'Gastronomía Yucateca', 'Paseo de Montejo'], '/images/cities/merida.jpg', 'Descubre Mérida con guías locales expertos. Tours culturales, gastronómicos y arqueológicos en la capital yucateca.'),
('valladolid', 'Valladolid', 'Yucatán', 'Pueblo Mágico cercano a Chichén Itzá, con cenotes impresionantes y arquitectura colonial colorida.', ARRAY['Cenote Zací', 'Chichén Itzá', 'Arquitectura Colonial', 'Calzada de los Frailes'], '/images/cities/valladolid.jpg', 'Guías locales en Valladolid para tours a Chichén Itzá, cenotes y recorridos coloniales.'),
('izamal', 'Izamal', 'Yucatán', 'La Ciudad Amarilla, Pueblo Mágico famoso por su convento franciscano y pirámides mayas.', ARRAY['Convento Franciscano', 'Pirámides Mayas', 'Artesanías', 'Calesas'], '/images/cities/izamal.jpg', 'Tours en Izamal con guías locales. Descubre la magia de la Ciudad Amarilla y sus pirámides.'),
('rio-lagartos', 'Río Lagartos', 'Yucatán', 'Reserva de la biosfera con miles de flamingos rosados, manglares y biodiversidad única.', ARRAY['Flamingos Rosados', 'Manglares', 'Ría', 'Pesca Deportiva'], '/images/cities/rio-lagartos.jpg', 'Tours de avistamiento de flamingos en Río Lagartos con guías especializados en ecoturismo.'),
('mani', 'Maní', 'Yucatán', 'Pueblo Mágico cuna del poc chuc, con historia maya y colonial fascinante.', ARRAY['Gastronomía Típica', 'Convento de San Miguel', 'Historia Maya', 'Poc Chuc'], '/images/cities/mani.jpg', 'Tours gastronómicos en Maní, cuna del poc chuc. Guías locales expertos.'),
('uxmal', 'Uxmal', 'Yucatán', 'Zona arqueológica Patrimonio de la Humanidad, máximo exponente del estilo arquitectónico Puuc.', ARRAY['Pirámide del Adivino', 'Arquitectura Puuc', 'Ruinas Mayas', 'Espectáculo de Luz'], '/images/cities/uxmal.jpg', 'Guías arqueológicos especializados en Uxmal. Descubre la majestuosa Pirámide del Adivino.'),
('celestun', 'Celestún', 'Yucatán', 'Reserva de la biosfera famosa por sus flamingos rosados, manglares y playas vírgenes.', ARRAY['Flamingos', 'Manglares', 'Playa Tranquila', 'Ojo de Agua Dulce'], '/images/cities/celestun.jpg', 'Tours de naturaleza en Celestún con guías especializados. Flamingos, manglares y playas.'),
('sisal', 'Sisal', 'Yucatán', 'Puerto histórico y pueblo de pescadores con playas tranquilas y gastronomía marina auténtica.', ARRAY['Puerto Histórico', 'Playa Tranquila', 'Historia del Henequén', 'Gastronomía Marina'], '/images/cities/sisal.jpg', 'Descubre Sisal con guías locales. Historia, playas y la mejor gastronomía marina de Yucatán.'),
('playa-del-carmen', 'Playa del Carmen', 'Quintana Roo', 'Cosmopolita ciudad en la Riviera Maya, puerta a Cozumel y cenotes impresionantes.', ARRAY['Quinta Avenida', 'Ferry a Cozumel', 'Cenotes', 'Vida Nocturna'], '/images/cities/playa-del-carmen.jpg', 'Guías locales en Playa del Carmen para tours a cenotes, Cozumel y Riviera Maya.'),
('tulum', 'Tulum', 'Quintana Roo', 'Ruinas mayas frente al mar Caribe, playas paradisíacas y cenotes sagrados.', ARRAY['Zona Arqueológica Frente al Mar', 'Playas', 'Cenotes', 'Vida Bohemia'], '/images/cities/tulum.jpg', 'Tours arqueológicos y de naturaleza en Tulum con guías expertos. Ruinas, playas y cenotes.'),
('bacalar', 'Bacalar', 'Quintana Roo', 'La Laguna de los 7 Colores, pueblo mágico con aguas cristalinas y cenotes únicos.', ARRAY['Laguna de 7 Colores', 'Cenote Azul', 'Fuerte de San Felipe', 'Kayak'], '/images/cities/bacalar.jpg', 'Tours en la Laguna de Bacalar con guías locales. Kayak, snorkel y naturaleza.'),
('isla-mujeres', 'Isla Mujeres', 'Quintana Roo', 'Isla paradisíaca con playas de arena blanca, arrecifes de coral y ambiente caribeño.', ARRAY['Playas Paradisíacas', 'Snorkel y Buceo', 'Tortugas Marinas', 'Punta Sur'], '/images/cities/isla-mujeres.jpg', 'Guías especializados en Isla Mujeres. Tours de snorkel, playas y cultura caribeña.'),
('campeche', 'Campeche', 'Campeche', 'Ciudad Patrimonio de la Humanidad con murallas coloniales, fuertes y centro histórico colorido.', ARRAY['Centro Histórico', 'Murallas Coloniales', 'Fuertes', 'Malecón'], '/images/cities/campeche.jpg', 'Tours históricos en Campeche con guías certificados. Ciudad Patrimonio de la Humanidad.'),
('calakmul', 'Calakmul', 'Campeche', 'Zona arqueológica maya en lo profundo de la selva, reserva de biosfera con fauna silvestre.', ARRAY['Ruinas Mayas', 'Reserva de Biosfera', 'Fauna Silvestre', 'Selva Virgen'], '/images/cities/calakmul.jpg', 'Expediciones arqueológicas a Calakmul con guías experts en cultura maya y naturaleza.'),
('isla-aguada', 'Isla Aguada', 'Campeche', 'Pueblo de pescadores en la costa con flamingos, playas vírgenes y tradición pesquera.', ARRAY['Flamingos', 'Pesca Deportiva', 'Playas Vírgenes', 'Laguna de Términos'], '/images/cities/isla-aguada.jpg', 'Tours de pesca y naturaleza en Isla Aguada. Flamingos y tradición pesquera auténtica.');
