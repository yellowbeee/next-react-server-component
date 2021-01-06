import db from '../../../server/db'

export default function handle(req, res) {
  let {updates} = req.body
  if (!updates || !Array.isArray(updates) || updates.length === 0) {
    res.send({code: -1, data: null, message: 'loss updates params'})
  } else {
    db.update('todos', todos => {
      return todos.map(item => {
        const target = updates.find(update => update.id == item.id)
        if (!target) return item
        else {
          return {
            ...item,
            status: target.status,
          }
        }
      })
    }).write()
    res.send({code: 0, data: null, message: 'update success'})
  }
}
