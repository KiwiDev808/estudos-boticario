import { App } from './app'
import { PORT } from './config'
import { todoHandle } from './routes/todoRoute'

const app = new App([todoHandle])

app.init().listen(PORT || 3003, () => {
  console.log('Server running on port 3003')
})
