import './config/dotenv'
import './config/module-alias'

import build from './app'

const app = build({ logger: true })

app.listen({ port: Number(process.env.PORT) || 3000 }).catch(err => {
  app.log.error(err)
  process.exit(1)
})
