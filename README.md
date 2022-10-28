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

-hook 只能在组件或者其他 hook 中运行
-hook 必须以 use 开头
-State 的 setName 是异步的
-Promise 的构建里面透视同步执行只有 then 和 cath 里面才会异步执行
-react hook 与闭包的坑 因为 hook 初始化的时候执行的方法一直被保留着，没有更新掉所以不会触发值更新，所以要传入变化的值 hook 的 retun 清理副作用只有在组件销毁和依赖修改的时候触发
-useMemo 避免高开销，阻止循循环执行，hook 中然会新对象的时候使用避免每次都是新的引用地址从而死循环
-## 柯里化函数式编程函数的连续返回新的函数
-useState 中传入函数会被 react 认为是惰性初始 state 会在初始的时候直接调用，会触发组件渲染 函数用法 setDtate(prevState => ({}))
-useRef 不是组件状态不会触发组件只是一个变量不会触发组件渲染需要执行 current 不能拿到最新的数据需要执行 current()才行
