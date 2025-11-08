import { createYoga, createSchema } from 'graphql-yoga';
import { typeDefs } from './schema';
import { resolvers, Context } from './resolvers';
import { ChatStorageService } from './storage';
import { OpenAIService } from './openai';
import { Env } from './types';

// export default {
//   async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
//     // 检查必要的环境变量
//     console.log('env=',env);
//     return new Response('Hello World', { status: 200 });
//   }
// };

const schema = createSchema({
  typeDefs,
  resolvers
});


export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);
    console.log('request=',url);
    // 检查必要的环境变量
    console.log('env=',env);
    if (!env.OPENAI_API_KEY) {
      return new Response('OpenAI API key not configured', { status: 500 });
    }

    if (!env.CHAT_STORAGE) {
      return new Response('Chat storage not configured', { status: 500 });
    }
    if(url.pathname=== '/'){
        // 测试 KV 存储
        await env.CHAT_STORAGE.put('test', 'Hello World');
        const value = await env.CHAT_STORAGE.get('test');

        return new Response(`KV Test: ${value}`, { status: 200 });
    }

    // 简单的健康检查
    if (url.pathname === '/health') {
      return new Response(JSON.stringify({
        status: 'ok',
        timestamp: new Date().toISOString(),
        environment: 'development'
      }), {
        headers: { 
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      });
    }
     

    // 创建服务实例
    const storage = new ChatStorageService(env.CHAT_STORAGE);
    const openai = new OpenAIService(env.OPENAI_API_KEY,env.OPENAI_BASE_URL);

    // 创建 GraphQL Yoga 实例
    const yoga = createYoga({
      schema,
      context: (): Context => ({
        env,
        storage,
        openai
      }),
      cors: {
        origin: [
          'http://localhost:3000',
          'https://localhost:3000',
          // 添加您的前端域名
          'https://ai-chat-box-frontend.pages.dev',
          'https://ai-chat-box-frontend.deeperin.info',
        ],
        credentials: true
      },
      graphqlEndpoint: '/graphql',
      landingPage: false
    });

    return yoga.fetch(request, env, ctx);
  }
};
