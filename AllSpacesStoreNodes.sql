-- from https://blog.dbi-services.com/alfresco-some-useful-database-queries/
select concat('https://path/to/SpacesStore/', n.uuid,'/', np.string_value, '?ticket=TICKET_aaabbb__TheActualTicket_cccc')
from alf_node_properties np
left join alf_node n on np.node_id = n.id
where n.store_id = 6
and np.string_value like '%.%';
-- This was also adding lines which had the following superfluous filenames (due to version control, which we did not need).
-- So, removed the extra lines using the following:
-- grep -v "/1.0?ticket=" dlist2.txt > dlist3.txt
-- grep -v "/{http://www.alfresco.org/model/" dlist3.txt > dlist2.txt
-- grep -v "000Z?ticket=" dlist2.txt > dlist3.txt
-- This reduced the number of files nearly 3x.
