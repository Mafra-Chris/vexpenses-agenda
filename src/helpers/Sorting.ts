import { Contact } from '../ts/interfaces/contacts'

export function sortAndGroupContacts(contacts: Contact[]) {


  let groups = contacts.reduce((r, e) => {


    let group = e.name.charAt(0);

    if (!r[group]) {
      r[group] = { alphabet: group, record: [e] }
    } else {
      r[group].record.push(e)
    };


    return r;
  }, {});
  let result = Object.values(groups);
  console.log(result);
}