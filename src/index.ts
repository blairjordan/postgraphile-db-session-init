import {
  PostGraphilePlugin,
  PostGraphileOptions,
  withPostGraphileContext,
} from "postgraphile";

const DbSessionInitPlugin = ({
  sql,
  precondition,
}: {
  sql: string;
  precondition?: (options: PostGraphileOptions) => boolean;
}): PostGraphilePlugin => ({
  withPostGraphileContext: (previous: any, _: any) => {
    const originalWithContext = previous ? previous : withPostGraphileContext;

    return async (options: PostGraphileOptions, callback) => {
      const context = await originalWithContext(options, async (ctx: any) => {
        if (!precondition || (precondition && precondition(options))) {
          await ctx.pgClient.query(sql);
        }

        return callback(ctx);
      });

      return context;
    };
  },
});

export default DbSessionInitPlugin;
