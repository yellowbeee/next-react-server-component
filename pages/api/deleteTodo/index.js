import db from '../../../server/db'

export default function handle(req, res) {
  let {ids} = req.body
  if (!ids || !Array.isArray(ids) || !ids.length) {
    res.send({code: -1, data: null, message: 'loss ids params or ids not an array or ids is empty array'})
  } else {
    db.get('todos')
      .remove(item => ids.find(id => item.id == id))
      .write()
    res.send({code: 0, data: null, message: 'delete success'})
  }
}
