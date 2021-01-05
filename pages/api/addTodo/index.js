import db from '../../../server/db'

export default function handle(req, res) {
  const {name} = req.query
  if (!name) {
    res.send({code: -1, data: null, message: 'loss name params'})
  } else {
    db.get('todos')
      .push({id: new Date() / 1, name})
      .write()
    res.send({code: 0, data: null, message: 'add success'})
  }
}
