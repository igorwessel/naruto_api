import './config/dotenv'
import './config/module-alias'

import build from './app'

const app = build({ logger: true })

app.listen(process.env.PORT ?? 3000, '0.0.0.0').catch(err => {
  app.log.error(err)
  process.exit(1)
})
