/** --- 测试 vite 的 build.target 配置项 --- **/
export async function testAsyncAndAwait() {
  try {
    const b = 1;
    console.log(b);
    await Promise.resolve('hello world test');
  } catch (error) {
    return error;
  }
}
/** --- 测试 vite 的 build.target 配置项 --- **/
