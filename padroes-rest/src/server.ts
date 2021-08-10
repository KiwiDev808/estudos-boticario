import { app } from './app'
import { PORT } from './config'

app.listen(PORT || 3003, () => {
  console.log('Server running on port 3003')
})
