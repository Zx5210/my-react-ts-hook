# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### hook

-# 这种使用 请求方式 + 请求的 url 地址的这种 pathinfo 模式形成的 api，通常都叫做 RESTFull 风格的接口 api。
-# 不符合 RESTFull 规范的 api
-hook 只能在组件或者其他 hook 中运行
-hook 必须以 use 开头
-# 判断什么时候使用 hook 什么时候使用函数，看函数里面需不需要使用 hook，如果不需要就当函数需要就用 hook 需要使用 hook 就需要把自己也变化 hook
-State 的 setName 是异步的
-Promise 的构建里面透视同步执行只有 then 和 cath 里面才会异步执行
-react hook 与闭包的坑 因为 hook 初始化的时候执行的方法一直被保留着，没有更新掉所以不会触发值更新，所以要传入变化的值 hook 的 retun 清理副作用只有在组件销毁和依赖修改的时候触发
-useMemo 避免高开销，阻止循循环执行，hook 中然会新对象的时候使用避免每次都是新的引用地址从而死循环
-# 柯里化函数式编程函数的连续返回新的函数
-useState 中传入函数会被 react 认为是惰性初始 state 会在初始的时候直接调用，会触发组件渲染 函数用法 setDtate(prevState => ({}))
-useRef 不是组件状态不会触发组件只是一个变量不会触发组件渲染需要执行 current 不能拿到最新的数据需要执行 current()才行
-const let 初始化会放到暂时性死区里面
-component composition 解决组件解耦的问题可以减少传递 props 的属性
-# 控制反转 把传统的控制从主动的变为被动的 这样的好处就是子组件不需要知道复杂的逻辑 只要渲染就好了
-hook 的出现是为了解决高阶组件的嵌套和操作难以理解的问题
-# 同步函数是可以预测的异步函数是一个副作用
-# redux-thunk 异步处理库 applyMiddleware 中间件 redux-thunk 最大的作用是使异步处理变得更友好不需要关注异步的细节，可以拦截异步并处理返回处理
-# 状态保存的方案 React.createContext、React.redux、URL

- optimistic 乐观更新
