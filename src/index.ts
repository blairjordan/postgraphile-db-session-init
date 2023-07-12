import { PostGraphilePlugin, withPostGraphileContext } from "postgraphile";

const sessionInitPlugin: PostGraphilePlugin = {
  withPostGraphileContext: (previous: any, _: any) => {
    const originalWithContext = previous ? previous : withPostGraphileContext;

    return async (options, callback) => {
      const context = await originalWithContext(options, async (ctx: any) => {
        try {
          await ctx.pgClient.query("INSERT INTO test_table VALUES('it ran')");
          return callback(ctx);
        } finally {
          await ctx.release();
        }
      });

      return context;
    };
  },
};
export default sessionInitPlugin;
