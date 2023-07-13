import {
  PostGraphilePlugin,
  withPostGraphileContext,
  WithPostGraphileContextOptions,
} from "postgraphile";

const DbSessionInitPlugin = ({ sql }: { sql: string }): PostGraphilePlugin => ({
  withPostGraphileContext: (previous: any, _: any) => {
    const originalWithContext = previous ? previous : withPostGraphileContext;

    return async (options: WithPostGraphileContextOptions, callback) => {
      const context = await originalWithContext(options, async (ctx: any) => {
        await ctx.pgClient.query(sql);
        return callback(ctx);
      });

      return context;
    };
  },
});

export default DbSessionInitPlugin;
