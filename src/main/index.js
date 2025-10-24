import { app } from 'electron'
import is from 'electron-is'
import { initialize } from '@electron/remote/main'

import Launcher from './Launcher'

// 设置EventEmitter默认最大监听器数量，避免内存泄漏警告
require('events').EventEmitter.defaultMaxListeners = 100

/**
 * initialize the main-process side of the remote module
 */
initialize()

process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = 'true'

if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

/**
 * Fix Windows notification func
 * appId defined in .electron-vue/webpack.main.config.js
 */
if (is.windows()) {
  app.setAppUserModelId(appId)
}

global.launcher = new Launcher()
