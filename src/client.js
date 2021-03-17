const Client = (token) => ({
  doQuery(query) {
    return fetch('https://graphql.datocms.com/preview', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ query }),
    }).then((res) => res.json());
  },
  getReferences(id) {
    return fetch(`https://site-api.datocms.com/items/${id}/references`, {
      headers: {
        'X-Api-Version': 3,
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }).then((r) => r.json());
  },
  getItemTypeFields(idOrKey) {
    return fetch(`https://site-api.datocms.com/item-types/${idOrKey}/fields`, {
      headers: {
        'X-Api-Version': 3,
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }).then((r) => r.json());
  },
  getItem(id) {
    return fetch(`https://site-api.datocms.com/items/${id}`, {
      headers: {
        'X-Api-Version': 3,
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }).then((r) => r.json());
  },
  getField(id) {
    return fetch(`https://site-api.datocms.com/fields/${id}`, {
      headers: {
        'X-Api-Version': 3,
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }).then((r) => r.json());
  },
  setField(id, data) {
    return fetch(`https://site-api.datocms.com/fields/${id}`, {
      method: 'PUT',
      headers: {
        'X-Api-Version': 3,
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    }).then((r) => r.json());
  },
});

export default Client;

// export const getThing = (token) => async (id) => fetch(`https://site-api.datocms.com/items/${id}`, {
//     headers: {
//       'X-Api-Version': 3,
//       'Accept': 'application/json',
//       'Authorization': `Bearer ${token}`,
//     },
//   }).then( r => r.json())

// export async function getItem(id, token) {
// }
