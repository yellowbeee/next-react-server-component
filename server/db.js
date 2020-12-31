import {fstat} from 'fs'
import Lowdb from 'lowdb'
import FileSync from 'lowdb/adapters/FileSync'
import path from 'path'
import {existsSync, mkdirSync} from 'fs'

const DATA_DIR = path.join(process.cwd(), 'db')
const DATA_PATH = 'data.json'

class DB {
  constructor() {
    if (!existsSync(DATA_DIR)) {
      mkdirSync(DATA_DIR)
    }
    this.db = new Lowdb(new FileSync(path.join(DATA_DIR, DATA_PATH)))
    this.db
      .defaults({
        todos: [],
      })
      .write()
  }
}

const db = new DB().db

export default db
