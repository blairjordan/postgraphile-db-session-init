# PostGraphile DB Session Init

This plugin enables you to run arbitrary  SQL prior to each PostGraphile query execution.

The SQL that you provide will run *after* [pgSettings](https://www.graphile.org/postgraphile/usage-library/#pgsettings-function). Hence, any session variables that you establish in pgSettings will be accessible in your SQL.

## Installation

```bash
npm install postgraphile-db-session-init
```

## Usage

The plugin requires a single argument: an object containing the following properties.

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

In this example, the `DbSessionInitPlugin` is used to create an instance of the plugin, initialized with a simple SQL command. The resulting instance is then included within the `pluginHook` which is passed into the postgraphile middleware during its initialization in the Express application.

### Precondition

Defining a `precondition` function allows you to control when the provided SQL should be executed based on specific conditions.

The `precondition` function should return a boolean value. If the function returns `true` (or is undefined), the SQL command will be executed. On the other hand, if the function is returns `false`, the SQL command will not be executed.


```ts
const dbSessionInitPlugin = DbSessionInitPlugin({
  sql: 'INSERT INTO my_audit_log (user_id, action) VALUES ($1, $2)',
  precondition: (options) =>
    options.pgSettings &&
    'role' in options.pgSettings &&
    options.pgSettings.role === 'authenticated_user',
});
```

In this example, the SQL command will only be executed if the precondition conditions are met, specifically if the `role` in `pgSettings` is set to 'authenticated_user'.
