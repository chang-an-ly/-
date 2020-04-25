#   运行本文件项目 必须先 npm install 安装需要依赖的包

## webpack 中  webpack.config 配置 
## 先本地安装 webpack ： npm install webpack -D
    若未配置使用 = 'webpack 路径/文件名.js -o 路径/文件名.js' 

##  一、要用 module.exports = {} 向外暴露这个配置

###   1.使用命令'webpack' 就自动打包
           npm init -y 先生成配置文件
           npm i webpack -D  本地安装webpack
           npm i webpack-dev-server -D  本地安装webpack-dev-server
           webpack-dev-server 的作用是开启服务运行项目
####    1.1 配置入口文件;
           entry: path.join(__dirname, '入口文件')
####    1.2 配置出口文件 
####         1.21 因为要绝对路径 所以要应用 const path = require('path'); 这个模块
           output: { 
               path: path.join(__dirname, '出口路径')，
               filename: '生成的名字'
            }
            
            join 也可用 resolve 都是Node的路径拼接语法
####    1.3 配置 package.json 文件 在 scripts 对象里面写上
            "bulid": "webpack"
            现在打包文件变成了  npm run build
            "dev": "webpack-dev-server --open --port 3000 --contentBase src --hot"
            现在运行项目变成了 npm run dev
            webpack-dev-server = 包 
            --open = 自动打开浏览器    
            --port 3000 = 设置端口为3000
            --contentBase src = 设置默认启动路径为src  
            --hot = 实现js的热更新 能只更新局部代码 可以让浏览器不用刷新。
####        注：平时运行项目时可以在 html 页直接引入 <script src="/打包文件.js"></script> 因为运行项目会自动生成一个已经更新好了的 js 文件
####          若使用 dist 里面的 js 则每次运行项目之前必须运行一下 npm run build  编译更新js文件


##  二、 打包css及其他包
###     1. 打包css及less及sass
####     1.1 安装的 loader 
                使用样式loader都需要依赖 { npm i style-loader } 这loader 必须先安装
            打包css { 安装的loader:  npm i css-loader -D };
            打包less { npm i css-loader less-loader less -D };
            打包sass { npm i css-loader sass-loader sass -D };

####     2.2 配置 webpack.config.js 文件
            module: {
                rules: [
                    css加载规则  其中style-loader 必须放置在最左边 因为loder执行顺序是从右到左
                    //  配置css第三方规则
                    { 
                        test: /\.css$/,
                        use: ['style-loader', 'css-loader']
                    },
                    less第三方loader规则
                    { 
                        test: /\.less$/,
                         use: ['style-loader', 'css-loader', 'less-loader'] 
                    },
                    // 配置scss第三方loader规则
                    { 
                        test: /\.scss$/,
                         use: ['style-loader', 'css-loader', 'less-loader',          'sass-loader'] 
                    },
                        ]
                    }

                    也可以这样写
                        如less配置  对象偶尔可以进行传参
                        {
                            test:/\.less$/,
                            use: [
                                { loader:'style-loader' },
                                { loader:'css-loader' },
                                { loader:'less-loader' },
                            ]
                        },

##  三、 打包图片配置
###  1. 打包 url 引入图片
####        1.1 安装需要用的 loader  
                npm install url-loader -D  安装到本地
                npm install file-loader -D  解析大于 limit 的图片

####         1.2 配置 webpack.config.js 文件
                { 
                    test: /\.(jpg|png|gif|jpeg)$/, 
                    use: [
                        { 
                            loader: 'url-loader',
                            options: {
                                // kb 小于 lomit 的就会被转成base64编码
                                // kb 大于 lomit 则不会被转成base64编码
                                // kb 大于 lomit 的会用 file-loader 处理
                                lomit: 8129,

                                // name 是规定打包出去图片的name
                                // img[name] = 图片的名字
                                // .[hash:8] . 用来连接 hash:8 相当于截取8位hash值
                                // [ext] 原来图片的扩展名
                                name: 'img/[name].[hash:8].[ext]'
                            }
                        }
                    ]
                }

                也可以简介这样配置
                 { test: /\.(jpg|png|gif|jpeg)$/, use: 'url-loader?limit=1000&name=[hash:8]-[name].[ext]'},



##  四、 将Es6语法转换为Es5语法 便浏览器支持  注：4.0版本以上不用配置
###     1.1 安装包
            cnpm i babel-loader -D
            cnpm i babel-core -D
            cnpm i babel-preset-es2015 -D
###     1.2 配置 webpack.config.js 文件
            {
                test:/\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: [
                    { 
                        loader: 'babel-loader',
                        options: {
                           presets: ['es2015']
                        }
                    }
                ]
            }

##  五、 Vue开发的依赖
###     1.1 安装 vue 包
            cnpm i vue -S 因为是这个不止是开发依赖了 运行也是需要依赖vue文件的
###     1.2 在 main.js 引入Vue模块
            import Vue from 'vue'  
            但是这种引入的文件无法提供vue全部功能，所以需要修改文件的引入

            解决方法：[
                方法一：import Vue from 'vue' 修改webpack.config.js文件
                方法二：import Vue from '../node_modules/vue/dist/vue.js' 直接更改路径
                方法三：import Vue from 'vue' 在vue包中找到package.json文件再修改miain路径
            ]

###     1.3 方法一： 配置 webpack.config.js 文件方法
            resolve: {
                alias: {vue$: 'vue/dist/vue.esm.js'}
            }

            也可以  
            resolve: { 
                alias: {
                    "vue$": "vue/dist/vue.js"
                }
            }

####        上面2种方法都可以配置vue  alias意思是别名


##  六、 .vue文件处理
###         1.1 安装 .vue 处理文件  
                npm i vue-loader -D;     开发使用 所以 -D安装到本地
                npm i vue-template-compiler -D;

###         1.2 配置 webpack.config.js 文件

####        高版本在头部引入 const VueLoaderPlugin = require('vue-loader/lib/plugin');

                {
                    test: /\.vue$/, 
                    use: [
                        { loader: 'vue-loader' }
                    ]
                }

####        再在 module.exports 直属性配置
                plugins: [
                        new VueLoaderPlugin() //让vue后缀文件解析
                    ]


#               配置完成的 webpack.config.js 文件

// 引入模块文件
const path = require('path');
//  引入解析vue后缀文件的模块
const VueLoaderPlugin = require('vue-loader/lib/plugin');


module.exports = {
    // 入口文件
    entry: path.join(__dirname, 'src/main.js'),
    // 出口文件
    output: {
        // 出口路径
        path: path.join(__dirname, 'dist'),
        // 打包的名字
        filename : 'bundle.js',
        /* publicPath: 'dist/' */
    },
    module: {
        rules: [
            // 配置css第三方loader规则
            {
                test: /\.css$/,
                use: [
                    {loader: 'style-loader'},
                    {loader: 'css-loader'},
                ]
            },
            // 配置less第三方loader规则
            {
                test:/\.less$/,
                use: [
                    { loader: 'style-loader' },
                    { loader: 'css-loader' },
                    { loader: 'less-loader' },
                ]
            },
            // 配置sass第三方loader规则
            {
                test:/\.scss$/,
                use: [
                    { loader: 'style-loader' },
                    { loader: 'css-loader' },
                    { loader: 'less-loader' },
                    { loader: 'sass-loader' },
                ]
            },
            // 配置图片第三方loader规则
            { 
                test: /\.(jpg|png|gif|jpeg)$/, 
                use: [
                    { 
                        loader: 'url-loader',
                        options: {
                            lomit: 8129,
                            name: 'img/[name].[hash:8].[ext]'
                        }
                    }
                ]
            },
            // 配置.vue第三方加载loader】
            {
                test: /\.vue$/, 
                use: [
                    { loader: 'vue-loader' }
                ]
            }
        ]
    },
    resolve: {
        alias: {vue$: 'vue/dist/vue.esm.js'}
    },
    plugins: [
        new VueLoaderPlugin() //让vue后缀文件解析
    ]
};
