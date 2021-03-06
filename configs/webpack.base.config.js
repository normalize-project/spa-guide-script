const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const babelRules = require("@/configs/babel.rules");
const styleRules = require("@/configs/style.rules");
const resourcesRules = require("@/configs/resources.rules");

const getPluginFileList = require("@/utils/getPluginFileList");
const { source, exclude } = require("@/utils/getProjectConfig")();

module.exports = {
	devtool: "source-map",
	entry: (async () => {
		const pluginFileList = await getPluginFileList();
		return [...pluginFileList, path.resolve(process.cwd(), source, "index.js")]
	}),
	resolve: {
		alias: {
			"@": path.resolve(process.cwd(), source)
		},
		extensions: [".ts", ".js", ".jsx", ".tsx", ".json"]
	},
	module: {
		rules: [
			...babelRules({ exclude }),
			...styleRules({ exclude }),
			...resourcesRules({ exclude })
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: path.join(process.cwd(), source, "index.html")
		}),
		new MiniCssExtractPlugin({
			filename: "[name][hash:8].css",
			chunkFilename: "[id].css"
		})
	]
};