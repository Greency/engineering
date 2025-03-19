/** --- 测试 vite 的 build.target 配置项 --- **/
export async function testAsyncAndAwait() {
  try {
    await Promise.resolve('1');
  } catch (error) {
    return error;
  }
}
/** --- 测试 vite 的 build.target 配置项 --- **/
