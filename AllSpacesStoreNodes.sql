--DECLARE url1 varchar DEFAULT 'https://www.srisathyasaividyavahini.org/alfresco/d/direct/workspace/SpacesStore/';
--DECLARE urlticket varchar DEFAULT '?ticket=TICKET_0bcfeffa9ea6995c53dd1ac99d1e4b371036f60a';
-- from https://blog.dbi-services.com/alfresco-some-useful-database-queries/
select concat('https://path/to/SpacesStore/', n.uuid,'/', np.string_value, '?ticket=TICKET_aaabbb__TheActualTicket_cccc')
from alf_node_properties np
left join alf_node n on np.node_id = n.id
where n.store_id = 6
and np.string_value like '%.%';
