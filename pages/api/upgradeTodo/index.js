import db from '../../../server/db'

export default function handle(req, res) {
  const {id} = req.query
  if (!id) {
    res.send({code: -1, data: null, message: 'loss id params'})
  } else {
    const target = db
      .get('todos')
      .find({id: Number(id)})
      .value()
    if (target) {
      db.get('todos')
        .find({id: Number(id)})
        .assign({status: target.status === 0 ? 1 : 0})
        .write()
      res.send({code: 0, data: null, message: 'add success'})
    } else {
      res.send({code: -2, data: null, message: 'cannot find id data'})
    }
  }
}
