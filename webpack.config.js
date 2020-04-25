// 引入模块文件
const path = require('path');
//  引入解析vue后缀文件的模块
const VueLoaderPlugin = require('vue-loader/lib/plugin');



// 配置单个
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
