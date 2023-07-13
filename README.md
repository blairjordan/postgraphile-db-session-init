# PostGraphile Session Init

This plugin enables you to run arbitrary SQL before each PostGraphile query is executed.

The SQL that you provide will run *after* [pgSettings](https://www.graphile.org/postgraphile/usage-library/#pgsettings-function). Therefeore, any session variables that you set in `pgSettings` will be available in your SQL.

## Installation

```bash
npm install postgraphile-db-session-init
```

## Usage

The plugin takes a single argument, an object with the following properties:

```ts
const { default: DbSessionInitPlugin } = require("postgraphile-db-session-init")

const dbSessionInitPlugin = DbSessionInitPlugin({
  sql: "INSERT INTO my_table (my_col) VALUES ('test')",
})

const pluginHook = makePluginHook([dbSessionInitPlugin, /* other plugins */])

const app = express()

app.use(
  postgraphile(db, schemas, {
    // ... other settings
    pluginHook,
  })
)
```