import { PostGraphilePlugin, withPostGraphileContext } from "postgraphile";

const sessionInitPlugin: PostGraphilePlugin = {
  withPostGraphileContext: (previous: any, _: any) => {
    const originalWithContext = previous ? previous : withPostGraphileContext;

    return async (options, callback) => {
      const context = await originalWithContext(options, async (ctx: any) => {
        await ctx.pgClient.query(
          "INSERT INTO public.test_table VALUES(current_setting('player.test')::text)"
        );
        return callback(ctx);
      });

      return context;
    };
  },
};
export default sessionInitPlugin;
