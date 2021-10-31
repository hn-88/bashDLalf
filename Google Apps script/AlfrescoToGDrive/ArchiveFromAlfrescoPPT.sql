select  n.uuid, np.string_value
from alf_node_properties np
left join alf_node n on np.node_id = n.id
where n.store_id = 5
and np.string_value like '%.ppt%';
